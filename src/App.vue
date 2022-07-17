<template>
    <v-container>
        <div v-show="!inGame">
            <h2>
                Enter players name.
                <i>Type and hit entry if your name not in the list</i>
            </h2>
            <InputName ref="inputName" @submit="submit"></InputName>
        </div>

        <div v-if="inGame">
            <v-row>
                <v-col
                    v-for="play in players"
                    :key="play"
                    cols="8"
                    lg="6"
                    md="6"
                    xl="3"
                    ><Score
                        @result="result"
                        ref="scoreboard"
                        :username="play"
                    ></Score>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-btn @click="addCards" color="primary">add all</v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn @click="sendResult" color="info">result</v-btn>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col>
                    <v-btn @click="close" v-show="resultSeen" color="error"
                        >End Game</v-btn
                    >
                </v-col>
            </v-row>
        </div>
        <test></test>
    </v-container>
</template>

<script>
import Score from "./components/Score.vue";
import InputName from "./components/InputName.vue";

export default {
    name: "App",

    components: {
        Score,
        InputName,
    },

    data: () => ({
        inGame: $cookies.get("names") ? true : false,
        players: $cookies.get("names") ? JSON.parse($cookies.get("names")) : [],
        finalResult: [],
        resultSeen: false,
    }),

    methods: {
        submit(names) {
            this.players = names;
            this.inGame = true;
        },
        addCards() {
            // add a event to score child
            // for each of the score child, add a card
            this.$refs.scoreboard.forEach((element) => {
                element.addScore();
            });
        },
        // reset the game
        close() {
            this.players = [];
            this.finalResult = [];
            this.$refs.inputName.close();
            this.inGame = false;
            this.resultSeen = false;
        },
        // finish the game calculate the result
        sendResult() {
            this.finalResult = [];
            this.$refs.scoreboard.forEach((element) => {
                element.sendResult();
            });
        },
        result(result) {
            this.finalResult.push(result);
            if (this.finalResult.length === this.players.length) {
                this.$refs.scoreboard.forEach((element) => {
                    console.log(this.finalResult);
                    element.calculateResult(this.finalResult);
                });
            }
            this.resultSeen = true;
        },
    },
};
</script>
<style scoped>
h2 {
    text-align: center;
}
</style>
