<template>
  <div class="flex flex-col relative">
    <div class="flex flex-col w-72 md:w-96 mx-auto">
      <div
        id="title"
        class="border-indigo-500 flex w-full justify-between items-center border-2 bg-white px-2 py-1 rounded-md cursor-pointer"
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
      <div
        v-if="showDropList"
        class="w-full absolute top-9 bg-white mt-1 rounded-md"
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
            class="h-40 overflow-y-scroll bg-white border border-gray-300 rounded-md p-1"
          >
            <li
              v-for="(city, index) in allCity"
              :key="`${city} - ${index}`"
              class="text-xs md:text-base cursor-pointer font-roboto"
              @click="getPerMonth(city.id), visibility()"
            >
              {{ city.lokasi }}
            </li>
          </ul>
          <ul
            v-else
            class="h-40 overflow-y-scroll bg-white border border-gray-300 rounded-md p-1"
          >
            <li
              v-for="(result, index) in JSON.parse(
                JSON.stringify(searchResult)
              )"
              :key="`${result} - ${index}`"
              class="text-xs md:text-base cursor-pointer font-roboto"
              @click="getPerMonth(result.id), visibility()"
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
    };
  },
  computed: {
    ...mapGetters({
      allCity: "allCity",
      city: "city",
      jadwal: "jadwal",
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
    },
  },
  created() {
    this.getAllCity();
    this.getPerMonth("1218");
  },
  updated() {
    if (this.search.length == 0) {
      this.changeDisplayAll(true);
    }
  },
};
</script>
