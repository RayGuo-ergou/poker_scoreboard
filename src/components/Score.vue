<template>
    <v-container>
        <h4>{{ username }}</h4>
        <v-row>
            <v-col cols="9">
                <v-form v-model="valid">
                    <v-text-field
                        @focus="$event.target.select()"
                        type="number"
                        pattern="[0-9]*"
                        label="Main input"
                        hide-details="auto"
                        v-model="temp"
                        :rules="rules"
                        :min="0"
                        :max="13"
                    ></v-text-field>
                </v-form>
            </v-col>
            <!-- <v-col cols="2">
        <v-btn @click="addScore" color="primary">Add</v-btn>
      </v-col> -->
        </v-row>

        <v-dialog v-model="dialog">
            <v-card>
                <v-card-title color="error" class="text-h5 grey lighten-2"
                    >Error</v-card-title
                >
                <v-card-text>
                    <v-container>
                        {{ username }} has invalid input. (should between 1 to
                        13)
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

        <p v-show="showResult">{{ score }}</p>
        <!-- <p>{{ score }}</p> -->
        <!-- <p>{{ finalResult }}</p> -->
        <div v-html="calPayments"></div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            score: $cookies.isKey(this.username)
                ? parseInt($cookies.get(this.username))
                : 0,
            temp: 0,
            leftCards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            rules: [
                (v) => v >= 0 || 'Error:min 0',
                (v) => v <= 13 || 'Error:max 13',
            ],
            valid: true,
            dialog: false,
            finalResult: [],
            showResult: false,
        };
    },
    computed: {
        calPayments() {
            let str = '';
            this.finalResult.forEach((element) => {
                if (element.score > 0) {
                    str +=
                        '<p style="color: red">Pay ' +
                        element.username +
                        ': ' +
                        '<b>' +
                        element.score +
                        '</b>' +
                        '</p>';
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
            if (
                this.temp == NaN ||
                this.temp == undefined ||
                this.temp == null ||
                this.temp == ''
            ) {
                this.temp = 0;
            }
            if (this.valid || this.temp === 0) {
                let tempNum = parseInt(this.temp);

                // if temp in range of 7 to 9, temp = temp * 2
                if (tempNum >= 7 && tempNum <= 9) {
                    tempNum = tempNum * 2;
                }

                // if temp in range of 10 to 12, temp = temp * 3
                if (tempNum >= 10 && tempNum <= 12) {
                    tempNum = tempNum * 3;
                }

                // if temp == 13 , temp = 65
                if (tempNum == 13) {
                    tempNum = 65;
                }

                this.score += tempNum;
                // set cookie
                $cookies.set(this.username, this.score);
                this.temp = 0;
            } else {
                this.dialog = true;
            }

            this.finalResult = [];
        },
        sendResult() {
            this.$emit('result', {
                username: this.username,
                score: this.score,
            });
        },
        calculateResult(array) {
            // let currentScore = 0;
            this.finalResult = [];
            // array.forEach((element) => {
            //     // if element.username = this.username continue
            //     if (element.username === this.username) {
            //         currentScore = element.score;
            //         return;
            //     }
            // });
            array.forEach((element) => {
                if (element.username !== this.username) {
                    this.finalResult.push({
                        username: element.username,
                        score: this.score - element.score,
                    });
                }
            });
        },
    },
};
</script>
