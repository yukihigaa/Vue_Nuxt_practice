<template>
  <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">City</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in prefectures" :key="item.name">
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    prefectures() {
      return this.$store.state.prefectures.prefectures; // ファイル名.変数名
    },
  },
  async fetch({ $axios, store }) {

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
    let jsonObj = parser.parse(xml, options);
    
    // 必要な部分だけ取得
    let data = jsonObj.rss.channel['ldWeather:source'].pref;
    // console.log(data);

    // 全ての都道府県情報を入れる配列
    let prefectures = [];

    // 表示するための必要な情報を取得
    for(var i = 0; i < data.length; i++) {
      var place = {}; // 各都道府県の情報を入れる連想配列
      place['name'] = data[i].title;
      place['city'] = data[i].city;
      prefectures.push(place); // 配列に追加
    }
    // console.log(prefectures);
    store.commit('prefectures/add', prefectures);
  }
}
</script>
