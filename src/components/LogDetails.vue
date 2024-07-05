<template>
  <v-card id="details">
    <v-card-title id="detailsTitle">
      {{ post.title }}
    </v-card-title>

    <span id="subTitle">{{ post.date }}</span>
    <div id="btnBox">
      <v-btn
        size="small"
        prepend-icon="mdi-format-list-bulleted"
        @click="this.$router.push('/log')"
        color="secondary"
        >go to list</v-btn
      >
    </div>
    <v-divider></v-divider>
    <div id="doc" v-html="contents"></div>
  </v-card>
</template>

<script>
// 전체 posts json
import posts from "/public/json/_posts.json";
// markdown(.md) 파일 html로 convert
import htmlConverter from "@/utils/HTMLConverter";

export default {
  name: "LogDetails",
  data() {
    return {
      post: null,
      contents: null,
    };
  },
  created() {
    // 게시물 가져오기
    this.setPost();
  },
  methods: {
    async setPost() {
      // router에 parameter 가져오기
      const param = this.$route.params.seq;

      // 전체 포스트에서 parameter의 seq와 같은 포스트만 가져와 data 저장
      this.post = JSON.parse(JSON.stringify(posts)).filter(
        (e) => e.seq == param
      )[0];

      // 실제 파일 import
      const post = await import("/public/posts/" + this.post.fileName);

      // markdown(.md) 파일 html로 convert하여 data 저장
      this.contents = htmlConverter(post.default);
    },
  },
};
</script>

<style lang="scss">
#detailsTitle {
  justify-content: center;
  font-size: 30px;
  width: 100%;
  height: auto;
  padding-top: 3em;
  padding-bottom: 1em;
  font-weight: 700;
}

#subTitle {
  display: flex;
  justify-content: center;
  color: darkgray;
}

#btnBox {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
}

#doc {
  padding: 20px;

  * {
    margin: 5px;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.8em;
  }

  h3 {
    font-size: 1.6em;
  }

  h4 {
    font-size: 1.4em;
    margin: 1rem;
  }

  h5 {
    font-size: 1.2em;
    margin: 0.8rem;
  }

  h6 {
    font-size: 1em;
    margin: 0.6rem;
  }

  h1,
  h2,
  h3 {
    padding-bottom: 1.2rem;
    margin-bottom: 1.2rem;
    border-bottom: 1px solid lightgray;
  }

  h6 {
    color: darkgray;
    font-weight: 400;
  }

  code {
    background-color: #f7f7f7;
    padding: 5px;
    border-radius: 10px;
    margin: 0.3em;
    font-weight: 500;
  }

  pre {
    background-color: #f7f7f7;
    padding: 15px;
    border-radius: 10px;
    margin: 1em;
    white-space: pre-wrap;

    code {
      padding: 0;
      background-color: transparent;
      border-radius: none;
      margin: 0;
      font-weight: 400;
    }
  }

  a {
    text-decoration: none;
  }

  a:hover {
    background-color: aliceblue;
  }

  hr {
    margin-top: 2em;
    margin-bottom: 2em;
  }
}
</style>
