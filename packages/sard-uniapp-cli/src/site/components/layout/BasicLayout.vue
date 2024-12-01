<template>
  <Layout>
    <Header @sidebar-toggle="onSidebarToggle"></Header>
    <Layout row>
      <Sider v-model:visible="siderVisible"></Sider>
      <Layout>
        <Layout row>
          <Content>
            <Main>
              <router-view></router-view>
            </Main>
          </Content>
          <Mobile></Mobile>
          <Catalog></Catalog>
        </Layout>
        <Footer></Footer>
      </Layout>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Layout from './Layout.vue'
import Header from './Header.vue'
import Sider from './Sider.vue'
import Main from './Main.vue'
import Content from './Content.vue'
import Footer from './Footer.vue'
import Catalog from '../catalog/index.vue'
import Mobile from '../mobile/index.vue'

const siderVisible = ref(false)

const onSidebarToggle = () => {
  siderVisible.value = true
}
</script>
