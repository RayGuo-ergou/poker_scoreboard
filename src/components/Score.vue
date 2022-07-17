<template>
    <v-container>
        <h3>{{ username }}</h3>
        <h4>Score</h4>
        <v-row>
            <v-col cols="9">
                <v-form v-model="valid">
                    <v-text-field
                        @focus="$event.target.select()"
                        type="number"
                        label="Main input"
                        hide-details="auto"
                        v-model="temp"
                        :rules="rules"
                        :min="0"
                        :max="13"
                    ></v-text-field>
                </v-form>
            </v-col>
            <v-col cols="2"
                ><v-btn @click="addScore" color="primary">Add</v-btn></v-col
            >
        </v-row>

        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title color="error" class="text-h5 grey lighten-2"
                    >Error</v-card-title
                >
                <v-card-text>
                    <v-container>
                        {{ username }} has invalid input. (should between 1 to
                        65)
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false"
                        >Okay</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>

        <p>{{ score }}</p>
        <p>
            {{ finalResult }}
        </p>
        <p>{{ calPayments }}</p>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            score: 0,
            temp: 0,
            leftCards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            rules: [
                (v) => v >= 0 || "Error:min 0",
                (v) => v <= 65 || "Error:max 65",
            ],
            valid: true,
            dialog: false,
            finalResult: [],
        };
    },
    computed: {
        calPayments() {
            let str = "";
            this.finalResult.forEach((element) => {
                if (element.score > 0) {
                    str += element.username + ": " + element.score + "\n";
                }
            });
            return str;
        },
    },

    props: {
        username: {
            type: String,
            required: true,
        },
    },
    methods: {
        addScore() {
            // if valid is false
            // alert error
            if (this.valid || this.temp === 0) {
                this.score += parseInt(this.temp);
                this.temp = 0;
            } else {
                this.dialog = true;
            }
        },
        sendResult() {
            this.$emit("result", {
                username: this.username,
                score: this.score,
            });
        },
        calculateResult(array) {
            let currentScore = 0;
            let final = [];
            array.forEach((element) => {
                // if element.username = this.username continue
                if (element.username === this.username) {
                    currentScore = element.score;
                    return;
                } else {
                    final.push({
                        username: element.username,
                        score: element.score - currentScore,
                    });
                }
            });

            this.finalResult = final;
        },
    },
};
</script>
