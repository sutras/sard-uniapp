<template>
  <Layout>
    <Header></Header>
    <Layout row>
      <Sider></Sider>
      <Content>
        <Main>
          <router-view></router-view>
        </Main>
        <Footer></Footer>
      </Content>
      <Mobile></Mobile>
      <Catalog></Catalog>
    </Layout>
  </Layout>
</template>

<script setup lang="ts">
import Layout from './layout/Layout.vue'
import Header from './layout/Header.vue'
import Sider from './layout/Sider.vue'
import Main from './layout/Main.vue'
import Content from './layout/Content.vue'
import Footer from './layout/Footer.vue'
import Catalog from './catalog/index.vue'
import Mobile from './mobile/index.vue'
</script>
