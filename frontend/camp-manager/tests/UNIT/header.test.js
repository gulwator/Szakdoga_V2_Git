import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { createStore } from "vuex";
import axios from "axios";
import Header from "../../src/components/Header.vue";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { csrfToken: "csrf-token" } })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

vi.mock("@/routes", () => ({
  default: {
    push: vi.fn(),
  },
}));

function createStoreWithState(state = {}, actions = {}) {
  return createStore({
    state: {
      role: null,
      institution: null,
      token: null,
      csrfToken: null,
      user: null,
      ...state,
    },
    getters: {
      getRole: (state) => state.role,
      getInstitution: (state) => state.institution,
      getToken: (state) => state.token,
      getCsrfToken: (state) => state.csrfToken,
      getUser: (state) => state.user,
    },
    actions: {
      changeRole: actions.changeRole || vi.fn(),
      changeInstitution: actions.changeInstitution || vi.fn(),
      changeToken: actions.changeToken || vi.fn(),
      changeCsrfToken: actions.changeCsrfToken || vi.fn(),
      changeUser: actions.changeUser || vi.fn(),
    },
  });
}

describe("Header component", () => {
  let store;

  beforeEach(async () => {
    vi.clearAllMocks();
    localStorage.clear();
    const routes = await import("@/routes");
    routes.default.push.mockClear();
  });

  it("shows guest actions when role is null", () => {
    store = createStoreWithState({ role: "null", user: null });

    const wrapper = mount(Header, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const links = wrapper.findAll("a.nav-link").map((link) => link.text());
    expect(links).toContain("Regisztráció");
    expect(links).toContain("Bejelentkezés");
    expect(links).not.toContain("Kijelentkezés");
  });

  it("renders Kisero navigation links and logout", () => {
    store = createStoreWithState({
      role: "Kisero",
      user: { name: "Anna", role: "Kisero" },
    });

    const wrapper = mount(Header, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).toContain("Gyerekek");
    expect(wrapper.text()).toContain("Csoportok");
    expect(wrapper.text()).toContain("Kijelentkezés");
    expect(wrapper.text()).toContain("Gyerekek listája");
    expect(wrapper.text()).toContain("Gyerek hozzáadása");
    expect(wrapper.text()).toContain("Csoportok kezelése");
    expect(wrapper.text()).toContain("Csoportok órarendje");
    expect(wrapper.text()).toContain("Programok");
  });

  it("renders Taboroztato navigation links and logout", () => {
    store = createStoreWithState({
      role: "Taboroztato",
      user: { name: "Bela", role: "Taboroztato" },
    });

    const wrapper = mount(Header, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).toContain("Beosztás");
    expect(wrapper.text()).toContain("Táborozók");
    expect(wrapper.text()).toContain("Programok");
    expect(wrapper.text()).toContain("Kijelentkezés");
  });

  it("shows the authenticated user name and role", () => {
    store = createStoreWithState({
      role: "Kisero",
      user: { name: "Anna", role: "Kisero" },
    });

    const wrapper = mount(Header, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).toContain("Anna (Kisero)");
  });

  it("calls logout, clears localStorage and redirects", async () => {
    const actions = {
      changeRole: vi.fn(),
      changeInstitution: vi.fn(),
      changeToken: vi.fn(),
      changeUser: vi.fn(),
    };

    store = createStoreWithState(
      {
        role: "Kisero",
        token: "test-token",
        institution: "test-inst",
        user: { name: "Anna", role: "Kisero" },
      },
      actions,
    );

    localStorage.setItem("token", "test-token");
    localStorage.setItem("role", "Kisero");
    localStorage.setItem("institution", "test-inst");
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "Anna", role: "Kisero" }),
    );

    const wrapper = mount(Header, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const logoutLink = wrapper
      .findAll("a.nav-link")
      .find((link) => link.text() === "Kijelentkezés");
    expect(logoutLink).toBeTruthy();
    await logoutLink.trigger("click");

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("/csrf"), {
      withCredentials: true,
    });
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/logout"),
      {},
      expect.objectContaining({
        withCredentials: true,
        headers: expect.any(Object),
      }),
    );

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("role")).toBeNull();
    expect(localStorage.getItem("institution")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();

    expect(actions.changeToken).toHaveBeenCalledWith(expect.anything(), null);
    expect(actions.changeRole).toHaveBeenCalledWith(expect.anything(), "null");
    expect(actions.changeInstitution).toHaveBeenCalledWith(
      expect.anything(),
      "null",
    );
    expect(actions.changeUser).toHaveBeenCalledWith(expect.anything(), null);

    const routes = await import("@/routes");
    expect(routes.default.push).toHaveBeenCalledWith("/");
  });
});
