<template>
  <div
    class="relative mt-8 mb-8 overflow-hidden overflow-x-auto rounded-lg max-w-72 md:w-auto md:overflow-hidden"
    @click="changeShowDropList(false)"
  >
    <div
      class="inline-block px-1.5 py-1 mb-2 text-xs rounded-lg bg-thead md:text-base"
    >
      <span>{{ currentDate }}</span>
    </div>
    <div class="absolute top-0.5 right-0">
      <div
        v-if="this.jam < 0"
        class="inline-block px-1.5 py-1 mb-2 text-xs text-white bg-green-400 rounded-lg md:text-base"
      >
        <span>Selamat Berbuka Puasa</span>
      </div>
      <div v-else class="flex">
        <div
          class="px-1.5 py-1 mb-2 text-xs rounded-l-lg bg-thead md:text-base"
        >
          <span>Menuju Buka Puasa</span>
        </div>
        <div
          class="px-1 py-1 mb-2 text-xs text-center text-white bg-green-400 rounded-r-lg w-countdown md:w-24 md:text-base"
        >
          <span>{{ jam }} : {{ menit }} : {{ detik }}</span>
        </div>
      </div>
    </div>

    <div class="overflow-hidden rounded-lg">
      <table class="mx-auto">
        <thead class="border-b-2 border-gray-300 bg-thead">
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
  data() {
    return {
      jam: "",
      menit: "",
      detik: "",
      tgl: "",
      bln: "",
      thn: "",
    };
  },
  computed: {
    ...mapGetters({
      jadwalSebulan: "jadwalSebulan",
      showDropList: "showDropList",
      bukaPuasa: "bukaPuasa",
    }),
    thisDay() {
      const tgl = new Date();
      return tgl.getDate();
    },
    currentDate() {
      const nameMonth = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      return `${this.bukaPuasa.tanggal.split(",")[0]}, ${this.tgl} ${
        nameMonth[parseInt(this.bln) - 1]
      } ${this.thn} `;
    },
  },
  methods: {
    ...mapActions({
      changeShowDropList: "changeShowDropList",
    }),
    setCountDown() {
      const now = new Date();
      this.tgl = now.getDate();
      this.bln = now.getMonth() + 1;
      this.thn = now.getFullYear();

      const future = Date.parse(
        `${this.bln}/${this.tgl}/${this.thn}, ${this.bukaPuasa.maghrib}`
      );
      const diff = future - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor(diff / (1000 * 60));
      const secs = Math.floor(diff / 1000);

      this.jam = hours;
      this.menit = mins - hours * 60;
      this.detik = secs - mins * 60;
    },
    countDown() {
      setInterval(this.setCountDown, 1000);
    },
  },
  updated() {
    this.setCountDown();
    this.countDown();
  },
};
</script>

<style></style>
