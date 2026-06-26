<template>
  <div class="d-flex w-100">
    <ul class="navbar-nav">
      <HeaderHome />

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-testid="gyerekekDrpHeader"
        >
          Gyerekek
        </a>
        <ul class="dropdown-menu custom-dropdown">
          <li>
            <router-link
              data-testid="gyerekekListajaBtnHeader"
              class="dropdown-item text-light"
              to="/child-list"
              >Gyerekek listája</router-link
            >
          </li>
          <li>
            <router-link
              data-testid="gyerekHozzaadasBtnHeader"
              class="dropdown-item text-light"
              to="/create-contact"
              >Gyerek hozzáadása</router-link
            >
          </li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-testid="csoportokDrpHeader"
        >
          Csoportok
        </a>
        <ul class="dropdown-menu custom-dropdown">
          <li>
            <router-link
              data-testid="csoportokKezeleseBtnHeader"
              class="dropdown-item text-light"
              to="/manage-groups"
              >Csoportok kezelése</router-link
            >
          </li>
          <li>
            <router-link
              data-testid="csoportokOrarendjeBtnHeader"
              class="dropdown-item text-light"
              to="/groups-timetable"
              >Csoportok órarendje</router-link
            >
          </li>
          <li>
            <router-link
              data-testid="csoportokProgramjaiBtnHeader"
              class="dropdown-item text-light"
              to="/edit-programs"
              >Programok</router-link
            >
          </li>
        </ul>
      </li>
    </ul>

    <AuthActions :logout="logout" />
  </div>
</template>

<script setup>
import AuthActions from "./AuthActions.vue";
import HeaderHome from "./HeaderHome.vue";
const { logout } = defineProps({ logout: Function });
</script>
