<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import menuNavBar from "@/menuNavBar.js";
import { useStyleStore } from "@/stores/style.js";
import BaseIcon from "@/components/BaseIcon.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import { useAuthStore } from "@/stores/auth";

import admin from "@/router/menu/admin";
import kepegawaian from "@/router/menu/kepegawaian";
import sip from "@/router/menu/sip";
import umum from "@/router/menu/umum";
import program from "@/router/menu/program";
import keuangan from "@/router/menu/keuangan";
import wilayah from "@/router/menu/wilayah";

// useMainStore().setUser({
//   name: "John Doe",
//   email: "john@example.com",
//   avatar:
//     "https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93",
// });

const layoutAsidePadding = "xl:pl-60";

const styleStore = useStyleStore();

const router = useRouter();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);
const authStore = useAuthStore();

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});
const menuClick = async (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    const success = await authStore.logout();
    if (success) {
      router.push({ name: "login" });
    }
  }
};
const menu = computed(() => {
  if (authStore.user.user?.role.id == 1) {
    return admin;
  }
  if (authStore.user.user?.unit?.id == 3) return umum;
  if (authStore.user.user?.unit?.id == 4) return program;
  if (authStore.user.user?.unit?.id == 5) return keuangan;
  if (authStore.user.user?.unit?.id == 6) return kepegawaian;
  if (authStore.user.user?.unit?.id == 7) return sip;
  if (authStore.user.user?.unit?.id > 8) return wilayah;
});
</script>

<template>
  <div
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[
          layoutAsidePadding,
          { 'ml-60 lg:ml-0': isAsideMobileExpanded },
        ]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon
            :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          @click.prevent="isAsideLgActive = true"
        >
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menu"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <RouterView />
      <FooterBar> </FooterBar>
    </div>
  </div>
</template>
