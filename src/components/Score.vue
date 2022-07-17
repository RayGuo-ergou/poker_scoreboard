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
                <v-card-title class="text-h5 grey lighten-2">
                    Privacy Policy
                </v-card-title>

                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <p>{{ score }}</p>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            score: 0,
            temp: 0,
            leftCards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            rules: [(v) => v >= 0 || "min 0", (v) => v <= 13 || "max 13"],
            valid: true,
            dialog: false,
        };
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
    },
};
</script>
