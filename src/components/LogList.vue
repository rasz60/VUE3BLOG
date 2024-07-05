<template>
  <v-row class="category">
    <v-col cols="9">
      <v-chip prepend-icon="mdi-list-box-outline" link @click="fnSeeAll"
        >전체보기</v-chip
      >
    </v-col>

    <v-col cols="3">
      <v-text-field
        variant="underlined"
        v-model="searchKeyword"
        append-icon="mdi-magnify"
        placeholder="검색어 입력"
        @click:append="fnSearchPosts"
        @keyup="fnSearchPosts"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row v-for="(i, idx) in rows" :key="i" class="loggingRow">
    <v-col
      v-for="post in displayPosts.filter((e, index) => {
        if (index >= idx * 3 && index < (idx + 1) * 3) return e;
      })"
      :key="post"
      cols="4"
    >
      <router-link :to="`/log/` + post.seq" class="linkPost">
        <v-card class="post" link>
          <v-card-title class="postTitle">
            {{ post.title }}
          </v-card-title>

          <v-divider></v-divider>

          <div class="dateDiff">
            {{ post.dateDiff }}
          </div>
        </v-card>
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
import posts from "/public/json/_posts.json";

export default {
  name: "logList",
  data() {
    return {
      displayPosts: null,
      rows: 0,
      searchKeyword: "", // data searchKeyword 추가
    };
  },
  created() {
    // vue 생성 시
    this.displayPosts = this.getAllPosts(posts);
  },
  methods: {
    // 게시글 전체 가져오기
    getAllPosts(posts) {
      // json 파일 javascript 배열형태로 표시
      let tmpPostsList = JSON.parse(JSON.stringify(posts));
      // 작성일로부터의 날짜 차이 설정
      this.dateDiff(tmpPostsList);

      // seq 역순으로 정렬하여 return
      return tmpPostsList.sort(function (a, b) {
        return b.seq - a.seq;
      });
    },
    // dateDiff 설정
    dateDiff(posts) {
      let rst = "";

      for (var i in posts) {
        var dateParam = posts[i].date.substr(0, 10).split("-"); // date 값 년,월,일로 분할한 배열
        var timeParam = posts[i].date.substr(10).trim().split(":"); // date 값 시,분,초로 분할한 배열

        // milliseconds로 오늘과 작성일의 차이를 구함
        let diff =
          new Date().getTime() -
          new Date(
            dateParam[0],
            dateParam[1] - 1,
            dateParam[2],
            timeParam[0],
            timeParam[1],
            timeParam[2]
          ).getTime();

        // millisecond / 1000 => 초단위로 변경
        var t = Math.ceil(diff / 1000);

        if (t < 60) {
          // t가 60초 보다 작으면 n초 전
          rst = t + "초 전";
        } else if (t >= 60 && t < 60 * 60) {
          // t가 60초보다 크거나 같고 60분보다 작으면 n분 전
          rst = Math.ceil(t / 60) + "분 전";
        } else if (t >= 60 * 60 && t < 60 * 60 * 24) {
          // t가 60분보다 크거나 같고 24시간보다 작으면 n시간 전
          rst = Math.ceil(t / (60 * 60)) + "시간 전";
        } else if (t >= 60 * 60 * 24 && t < 60 * 60 * 24 * 30) {
          // t가 24시간보다 크거나 같고 30일보다 작으면 n일 전
          rst = Math.ceil(t / (60 * 60 * 24)) + "일 전";
        } else if (t >= 60 * 60 * 24 * 30 && t < 60 * 60 * 24 * 365) {
          // t가 30일보다 크거나 같고 365일보다 작으면 n개월 전
          rst = Math.ceil(t / (60 * 60 * 24 * 30)) + "개월 전";
        } else if (t >= 60 * 60 * 24 * 365) {
          // t가 365일보다 크거나 같으면 n년 전
          rst = Math.ceil(t / (60 * 60 * 24 * 365)) + "년 전";
        }

        // dateDiff에 값 설정
        posts[i].dateDiff = rst;
      }
    },
    // 랜덤 배경색 설정
    setPostBg() {
      let postTitle = document.querySelectorAll(".postTitle");

      if (postTitle.length > 0) {
        for (var i = 0; i < postTitle.length; i++) {
          var rColor = Math.floor(Math.random() * 256);
          var gColor = Math.floor(Math.random() * 256);
          var bColor = Math.floor(Math.random() * 256);

          postTitle[i].style.backgroundColor =
            "rgb(" + rColor + "," + gColor + "," + bColor + ", 0.1)";
        }
      }
    },
    // 검색 기능 메서드 추가
    fnSearchPosts(evt) {
      if (
        evt.keyCode == null || // 1. 검색 버튼 마우스 클릭
        (evt.keyCode != null && evt.keyCode == "13") // 2. 엔터입력
      ) {
        // 동적으로 변경되는 data 값 변수 선언
        var key = this.searchKeyword.trim();

        // 검색어 null 체크
        if (key == "") {
          alert("검색어를 입력해주세요.");
          return false;
        }

        // displayPosts 변경
        // 전체 포스트 get -> title에 key가 포함된 게시물만 조회
        this.displayPosts = this.getAllPosts(posts).filter(
          (post) => post.title.toUpperCase().indexOf(key.toUpperCase()) > -1
        );
      }
    },
    // 전체 게시물 목록 출력
    fnSeeAll() {
      this.displayPosts = this.getAllPosts(posts);
    },
  },
  watch: {
    displayPosts(v) {
      setTimeout(this.setPostBg, 10);
      this.rows = Math.ceil(v.length / 3);
    },
  },
};
</script>

<style lang="scss">
.category {
  margin: 0.3rem;
}

.post:hover {
  top: -0.3em;
  box-shadow: 0.3em 0.3em 1em lightgray;
}

.linkPost {
  text-decoration: none;
}

.v-card-title {
  display: flex !important;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: pre-wrap !important;
  height: 10em;
}

.dateDiff {
  padding: 10px 20px 10px 20px;
  text-align: right;
  font-style: italic;
  color: darkgrey;
}
</style>
