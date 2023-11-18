<script setup>
import {
  mdiForwardburger,
  mdiBackburger,
  mdiMenu,
  mdiAccount,
  mdiCogOutline,
  mdiLogout,
  mdiThemeLightDark,
} from "@mdi/js";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import menuNavBar from "@/menuNavBar.js";
import { useStyleStore } from "@/stores/style.js";
import BaseIcon from "@/components/BaseIcon.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import { useAuthStore } from "@/stores/auth";
import { useMenuStore } from "@/stores/menu";

import { useToast } from "vue-toastification";

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
const toast = useToast();

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = async (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    toast.info("Proses logout", {
      timeout: 1000,
    });

    const success = await authStore.logout();

    if (success) {
      toast.success("User berhasil Logout", {
        timeout: 1000,
      });
      router.push({ name: "login" });
    }
  }
};

const menu = computed(() => {
  return JSON.parse(localStorage.getItem("menu")) ?? [];
});

onMounted(() => {
  authStore.isLoggedIn;
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
