import axios from "axios";
export const state = () => ({
  inputCity: "",
  searchResult: [],
  allCity: [],
  cities: {},
  jadwal: {
    tanggal: "",
    imsak: "",
    subuh: "",
    dzuhur: "",
    ashar: "",
    maghrib: "",
    isya: "",
  },
  jadwalSebulan: [],
  city: "",
  displayAll: true,
  showDropList: false,
});

export const mutations = {
  setAllCity: (state, palyload) => {
    state.allCity = palyload;
  },
  setJadwal: (state, payload) => {
    state.jadwal.tanggal = payload.tanggal;
    state.jadwal.imsak = payload.imsak;
    state.jadwal.subuh = payload.subuh;
    state.jadwal.dzuhur = payload.dzuhur;
    state.jadwal.ashar = payload.ashar;
    state.jadwal.maghrib = payload.maghrib;
    state.jadwal.isya = payload.isya;
  },
  setJadwalSebulan: (state, payload) => {
    state.jadwalSebulan = payload;
  },
  setCity: (state, payload) => {
    state.city = payload;
  },
  setResult: (state, payload) => {
    state.searchResult = payload;
  },
  setDisplayAll: (state, payload) => {
    state.displayAll = payload;
  },
  setShowDropList: (state, payload) => {
    state.showDropList = payload;
  },
};

export const actions = {
  getAllCity({ commit }) {
    const data = {
      url: `https://api.myquran.com/v1/sholat/kota/semua`,
      method: "get",
    };
    axios(data)
      .then((response) => {
        commit("setAllCity", response.data);
      })
      .catch((response) => {
        console.log(response.message);
      });
  },
  searchCity({ commit }, city) {
    const data = {
      url: `https://api.myquran.com/v1/sholat/kota/cari/${city}`,
      method: "get",
    };
    axios(data)
      .then((response) => {
        commit("setResult", response.data.data);
      })
      .catch((response) => {
        console.log(response.message);
      });
  },
  getPerMonth({ commit }, id) {
    const today = new Date();
    const tahun = today.getFullYear();
    const bulan = today.getMonth();
    const data = {
      url: `https://api.myquran.com/v1/sholat/jadwal/${id}/${tahun}/${
        bulan + 1
      }`,
      method: "get",
    };
    axios(data)
      .then((response) => {
        const jadwal = response.data.data.jadwal;
        function selectFewerProps(filter) {
          const { tanggal, imsak, subuh, dzuhur, ashar, maghrib, isya } =
            filter;
          return { tanggal, imsak, subuh, dzuhur, ashar, maghrib, isya };
        }
        const newjadwalSebulan = jadwal.map(selectFewerProps);
        commit("setJadwalSebulan", newjadwalSebulan);
        commit("setCity", response.data.data.lokasi);
      })
      .catch((response) => {
        console.log(response.message);
      });
  },
  changeDisplayAll({ commit }, status) {
    commit("setDisplayAll", status);
  },
  changeShowDropList({ commit }, status) {
    commit("setShowDropList", status);
  },
};

export const getters = {
  allCity: (state) => state.allCity,
  jadwal: (state) => state.jadwal,
  jadwalSebulan: (state) => state.jadwalSebulan,
  city: (state) => state.city,
  searchResult: (state) => state.searchResult,
  displayAll: (state) => state.displayAll,
  showDropList: (state) => state.showDropList,
};
