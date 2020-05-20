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

    // parseするためのパッケージを読み込み
    var parser = require('fast-xml-parser');

    // XML取得
    const xml = await $axios.$get('http://weather.livedoor.com/forecast/rss/primary_area.xml');
    
    // parseするときのオプション定義（これを指定しなければ属性が取得できずNullになる）
    const options = {
      attributeNamePrefix : "", // Attribute名の先頭prefixを指定しない
      ignoreAttributes : false // XMLのattributeを取るためにはtrue
    }

    // XMLをJSONにする
    var jsonObj = parser.parse(xml, options);
    console.log(jsonObj.rss.channel['ldWeather:source'].pref[0]);
  }
}
</script>
