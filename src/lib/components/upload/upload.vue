<template>
	<view :class="uploadClass" :style="uploadStyle">
		<view :class="bem.e('wrapper')">
			<sar-upload-preview v-for="(item, index) in innerValue" :key="index" :file="item.file" :url="item.url" :is-image="item.isImage" :is-video="item.isVideo" :status="item.status" :name="item.name" :message="item.message" :removable="removable" :before-remove="beforeRemove" :index="index" :disabled="isDisabled" :readonly="isReadonly"
				@remove="onRemove(index, item)" @image-click="onImageClick" />
			<view v-if="innerValue.length < maxCount && !isReadonly" :class="bem.e('select')" @click="onSelect">
				<slot name="select">
					<view :class="bem.e('select-icon')">
						<sar-icon family="sari" name="plus" />
					</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { computed, ref, watch } from 'vue'
	import {
		classNames,
		stringifyStyle,
		createBem,
		getFileName,
		noop,
		isImageUrl,
		toArray,
		isFunction,
	} from '../../utils'
	import SarUploadPreview from '../upload-preview/upload-preview.vue'
	import SarIcon from '../icon/icon.vue'
	import { chooseMedia } from './utils'
	import {
		type UploadProps,
		type UploadSlots,
		type UploadEmits,
		type UploadFile,
		type UploadFileItem,
		type ChainNode,
		defaultUploadProps,
	} from './common'
	import { useFormContext, useFormItemContext } from '../form/common'

	defineOptions({
		options: {
			virtualHost: true,
			styleIsolation: 'shared',
		},
	})

	const props = withDefaults(defineProps<UploadProps>(), defaultUploadProps)

	defineSlots<UploadSlots>()

	const emit = defineEmits<UploadEmits>()

	const bem = createBem('upload')

	// main
	const formContext = useFormContext()
	const formItemContext = useFormItemContext()

	const isDisabled = computed(() => {
		return formContext?.disabled || props.disabled
	})

	const isReadonly = computed(() => {
		return formContext?.readonly || props.readonly
	})

	const innerValue = ref(props.modelValue || [])

	watch(
		() => props.modelValue,
		() => {
			innerValue.value = props.modelValue || []

			if (props.validateEvent) {
				formItemContext?.onChange()
			}
		},
	)

	const limitCountNode : ChainNode = (files : UploadFile[], next) => {
		const remainCount = props.maxCount - innerValue.value.length
		if (files.length > remainCount) {
			files = files.slice(0, remainCount)
		}
		next(files)
	}

	const beforeReadNode : ChainNode = (files : UploadFile[], next) => {
		Promise.allSettled<UploadFile>(
			files.map(
				(file) =>
					new Promise((resolve, reject) => {
						if (props.beforeRead) {
							const ret = props.beforeRead(file)
							if (!ret) {
								reject()
								return
							}
							if (ret instanceof Promise) {
								ret
									.then((mayNewFile) => {
										resolve(mayNewFile ?? file)
									})
									.catch(() => {
										reject()
									})
								return
							}
						}
						resolve(file)
					}),
			),
		).then((results) => {
			const fileList : UploadFile[] = []
			results.forEach((result) => {
				if (result.status === 'fulfilled') {
					fileList.push(result.value)
				}
			})
			next(fileList)
		})
	}

	const toUploadFileNode : ChainNode = (files : UploadFile[], next) => {
		const fileList = files.map((file) => {
			return {
				file,
				name: file.path && getFileName(file.path),
			}
		})

		next(fileList)
	}
	const limitSizeNode : ChainNode = (fileList : UploadFileItem[], next) => {
		const valid : UploadFileItem[] = []
		const invalid : UploadFileItem[] = []

		fileList.forEach((item) => {
			const file = item.file
			if (
				file &&
				((isFunction(props.maxSize) && props.maxSize(file)) ||
					(file.size &&
						typeof props.maxSize === 'number' &&
						file.size > props.maxSize))
			) {
				invalid.push(item)
			} else {
				valid.push(item)
			}
		})

		if (invalid.length) {
			props.overSize?.(invalid)
		}
		if (valid.length) {
			innerValue.value = [...innerValue.value, ...valid]
			emit('update:model-value', innerValue.value)
			emit('change', innerValue.value)
			next(valid)
		}
	}

	const afterReadNode : ChainNode = (fileList : UploadFileItem[]) => {
		toArray(fileList).forEach((fileItem) => {
			props.afterRead?.(fileItem)
		})
	}

	function toChain(files : UploadFile[]) {
		const chain = [
			limitCountNode,
			beforeReadNode,
			toUploadFileNode,
			limitSizeNode,
			afterReadNode,
		].reduceRight<(...args : any[]) => any>(
			(next, node) => (data : unknown) => {
				node(data, next)
			},
			() => {
				void 0
			},
		)

		chain(files)
	}

	let isSelectPending = false

	const onSelect = () => {
		if (
			isSelectPending ||
			isDisabled.value ||
			isReadonly.value ||
			innerValue.value.length >= props.maxCount
		) {
			return
		}

		let sourceType = props.sourceType || ['album', 'camera']
		const onChooseMedia = () => {
			chooseMedia({
				mediaType: props.accept,
				count: props.multiple ? 9999 : 1,
				sizeType: props.sizeType,
				sourceType,
				maxDuration: props.maxDuration,
				camera: props.camera,
				success(result) {
					toChain(
						result.tempFiles.map((file) => {
							return {
								type: file.fileType,
								size: file.size,
								path: file.tempFilePath,
								duration: file.duration,
								width: file.width,
								height: file.height
							}
						})
					)
				},
				fail: noop
			})
		}

		const onBeforeChoose = () => {
			if (props.beforeChoose) {
				isSelectPending = true
				props.beforeChoose?.(innerValue.value, sourceType, (allowed) => {
					isSelectPending = false
					if (allowed) onChooseMedia()
				})
			} else {
				onChooseMedia()
			}
		}

		// sourceType为['album', 'camera']时，进行特殊处理
		if (['album', 'camera'].every(item => sourceType.includes(item))) {
			// #ifdef APP-PLUS
			return uni.showActionSheet({
				itemList: ['拍摄', '从相册选择'],
				success: (res) => {
					sourceType = res.tapIndex === 0 ? ['camera'] : ['album']
					onBeforeChoose()
				}
			})
			// #endif
		}

		onBeforeChoose()
	}

	const onRemove = (index : number, item : UploadFileItem) => {
		const list = innerValue.value.filter((_, i) => i !== index)
		innerValue.value = list
		emit('update:model-value', list)
		emit('change', list)
		emit('remove', index, item)
	}

	const onImageClick = (index : number) => {
		const currentFileItem = innerValue.value[index]

		const fileList = innerValue.value.filter(
			(item) => (item.url && isImageUrl(item.url)) || item.file?.type === 'image',
		)
		const currentIndex = fileList.findIndex((item) => item === currentFileItem)
		const urls = fileList.map((item) => (item.url || item.file?.path) as string)

		uni.previewImage({
			urls,
			current: urls[currentIndex],
		})
	}

	const uploadClass = computed(() => {
		return classNames(
			bem.b(),
			bem.m('disabled', isDisabled.value),
			bem.m('readonly', isReadonly.value),
			props.rootClass,
		)
	})

	const uploadStyle = computed(() => {
		return stringifyStyle(props.rootStyle)
	})
</script>

<style lang="scss">
	@import './index.scss';
</style>