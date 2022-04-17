import axios from "axios";
export const state = () => ({
  inputCity: "",
  searchResult: [],
  allCity: [],
  cities: {},
  jadwalSebulan: [],
  city: "",
  displayAll: true,
  showDropList: false,
  bukaPuasa: {
    tanggal: "",
    maghrib: "",
  },
});

export const mutations = {
  setAllCity: (state, palyload) => {
    state.allCity = palyload;
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
  setBukaPuasa: (state, payload) => {
    state.bukaPuasa.tanggal = payload.tanggal;
    state.bukaPuasa.maghrib = payload.maghrib + ":00";
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
      .catch(() => {
        console.error("Error");
      });
  },
  searchCity({ commit }, city) {
    const data = {
      url: `https://api.myquran.com/v1/sholat/kota/cari/${city}`,
      method: "get",
    };
    axios(data)
      .then((response) => {
        if (response.data.status) {
          commit("setResult", response.data.data);
        } else {
          let data = {
            data: response.data,
          };
          commit("setResult", data);
        }
      })
      .catch(() => {
        console.error("Error");
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

        const index = new Date().getDate() - 1;
        commit("setBukaPuasa", {
          tanggal: newjadwalSebulan[index].tanggal,
          maghrib: newjadwalSebulan[index].maghrib,
        });
      })
      .catch(() => {
        console.error("Error");
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
  jadwalSebulan: (state) => state.jadwalSebulan,
  city: (state) => state.city,
  searchResult: (state) => state.searchResult,
  displayAll: (state) => state.displayAll,
  showDropList: (state) => state.showDropList,
  bukaPuasa: (state) => state.bukaPuasa,
};
