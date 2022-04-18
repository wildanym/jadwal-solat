<template>
  <div class="relative z-50 flex flex-col">
    <div class="flex flex-col mx-auto w-72 md:w-96">
      <div
        id="title"
        class="flex items-center justify-between w-full px-2 py-1 bg-white border-2 border-indigo-500 rounded-md cursor-pointer"
        @click="visibility"
      >
        <span class="text-xs md:text-base">{{ city }}</span>
        <img
          v-if="showDropList === false"
          src="../assets/image/down.png"
          alt="down"
          class="w-4 h-4"
        />
        <img v-else src="../assets/image/up.png" alt="down" class="w-4 h-4" />
      </div>
      <div class="flex items-center gap-1 mt-0.5">
        <input
          type="checkbox"
          class="h-3"
          v-model="statusDefault"
          @change="setDefaultCity"
        /><span class="text-xs text-white md:text-sm">
          Set kota sebagai default</span
        >
      </div>
      <div
        v-if="showDropList"
        class="absolute w-full bg-white rounded-md md:mt-1 md:top-9 top-8"
      >
        <div class="px-2">
          <input
            type="text"
            v-model="search"
            @keyup="searchCity(search), changeDisplayAll(false)"
            placeholder="Cari Kota"
            class="input-style"
          />
        </div>
        <div class="p-2">
          <ul
            v-if="displayAll"
            class="h-40 p-1 overflow-y-scroll bg-white border border-gray-300 rounded-md"
          >
            <li
              v-for="(city, index) in allCity"
              :key="`${city} - ${index}`"
              class="text-xs cursor-pointer md:text-base font-roboto"
              @click="
                getPerMonth(city.id), visibility(), (currentCityId = city.id)
              "
            >
              {{ city.lokasi }}
            </li>
          </ul>
          <ul
            v-else
            class="h-40 p-1 overflow-y-scroll bg-white border border-gray-300 rounded-md"
          >
            <li
              v-for="(result, index) in JSON.parse(
                JSON.stringify(searchResult)
              )"
              :key="`${result} - ${index}`"
              class="text-xs cursor-pointer md:text-base font-roboto"
              @click="
                getPerMonth(result.id),
                  visibility(),
                  (currentCityId = result.id)
              "
            >
              {{ result.lokasi ? result.lokasi : result.message }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      isVisible: false,
      currentCityId: "",
      statusDefault: false,
    };
  },
  computed: {
    ...mapGetters({
      allCity: "allCity",
      city: "city",
      searchResult: "searchResult",
      displayAll: "displayAll",
      showDropList: "showDropList",
    }),
  },
  methods: {
    ...mapActions({
      getAllCity: "getAllCity",
      getThisDay: "getThisDay",
      getPerMonth: "getPerMonth",
      searchCity: "searchCity",
      changeDisplayAll: "changeDisplayAll",
      changeShowDropList: "changeShowDropList",
    }),
    visibility() {
      this.changeShowDropList(!this.showDropList);
      if (this.showDropList) {
        title.classList.replace("border-indigo-500", "border-yellow-500");
      } else {
        title.classList.replace("border-yellow-500", "border-indigo-500");
      }
      if (this.currentCityId === localStorage.idKota) {
        this.statusDefault = true;
      } else {
        this.statusDefault = false;
      }
    },
    setDefaultCity() {
      if (this.statusDefault) {
        localStorage.setItem("idKota", this.currentCityId);
      } else {
        localStorage.removeItem("idKota");
      }
    },
  },
  created() {
    this.getAllCity();
  },
  mounted() {
    if (localStorage.idKota) {
      this.getPerMonth(localStorage.idKota);
      this.statusDefault = true;
    } else {
      this.getPerMonth("1218");
    }
  },
  updated() {
    if (this.search.length == 0) {
      this.changeDisplayAll(true);
    }
  },
};
</script>
