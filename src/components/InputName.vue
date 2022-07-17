<template>
    <v-container>
        <v-combobox
            clearable
            outlined
            hide-selected
            multiple
            chips
            label="Enter player name"
            :items="names"
            v-model="select"
        ></v-combobox>
        <v-btn id="submit" color="info" @click="submit">SUBMIT</v-btn>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            select: [],
            names: ["Ray", "Reco", "Alan", "Daniel", "Sharonron", "Kevin"],
        };
    },
    watch: {
        select(val) {
            // if count bigger than 4, pop last value
            if (val.length > 4) {
                this.$nextTick(() => {
                    this.select.pop();
                });
            }
        },
    },
    // when click submit, check if count is 4, emit event to parent
    methods: {
        submit() {
            if (this.select.length === 4) {
                this.$emit("submit", this.select);
                $cookies.set("names", this.select);
            }
        },
        close() {
            this.select = [];
        },
    },
};
</script>
<style scoped>
#submit {
    margin: 0 auto;
}
</style>
