<template>
  <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">City</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  data() {
    return {
      message: 'テスト表示',
      desserts: [
        {
          name: 'Tokyo'
        },
        {
          name: 'Osaka'
        },
        {
          name: 'Fukuoka'
        },
        {
          name: 'Okinawa'
        }
      ]
    }
  },
  async asyncData({ $axios }) {
    const res = await $axios.$get('http://weather.livedoor.com/forecast/rss/primary_area.xml');
    const citys = res.getElementsByTagName('city');
    console.log(res);
  }
}
</script>
