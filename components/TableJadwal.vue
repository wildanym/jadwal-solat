<template>
  <div
    class="max-w-72 md:w-auto rounded-lg overflow-hidden mt-6 overflow-x-auto md:overflow-hidden mb-8"
    @click="changeShowDropList(false)"
  >
    <span
      v-for="(value, index) in jadwalSebulan"
      :key="`${value} - ${index}`"
      v-if="index === thisDay - 1"
      class="mb-2 inline-block text-white text-sm md:text-base"
      >{{ value.tanggal }}</span
    >
    <div class="rounded-lg overflow-hidden">
      <table class="mx-auto">
        <thead class="bg-thead border-b-2 border-gray-300">
          <tr>
            <th class="thead-style">Tgl</th>
            <th class="thead-style">Imsak</th>
            <th class="thead-style">Shubuh</th>
            <th class="thead-style">Dzuhur</th>
            <th class="thead-style">Ashar</th>
            <th class="thead-style">Magrib</th>
            <th class="thead-style">Isya</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, index) in jadwalSebulan"
            :key="`${value} - ${index}`"
            :class="{
              rowOdd: index % 2 === 1,
              rowEven: index % 2 === 0,
              rowThisDay: index + 1 === thisDay,
            }"
          >
            <td class="py-3 td-style">
              {{ index + 1 }}
            </td>
            <td class="td-style">
              {{ value.imsak }}
            </td>
            <td class="td-style">
              {{ value.subuh }}
            </td>
            <td class="td-style">
              {{ value.dzuhur }}
            </td>
            <td class="td-style">
              {{ value.ashar }}
            </td>
            <td class="td-style">
              {{ value.maghrib }}
            </td>
            <td class="px-2 td-style">
              {{ value.isya }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TableJadwal",
  computed: {
    ...mapGetters({
      jadwalSebulan: "jadwalSebulan",
      showDropList: "showDropList",
    }),
    thisDay() {
      const tgl = new Date();
      return tgl.getDate();
    },
  },
  methods: {
    ...mapActions({
      changeShowDropList: "changeShowDropList",
    }),
  },
};
</script>

<style></style>
