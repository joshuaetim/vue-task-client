<template>

    <section class="steps" id="steps">
        <div class="container">
            <div class="mx-auto col-md-12 col-lg-7">

                <!-- step-1 -->

                <div v-if="errorKey != ''">
                    <div v-if="errorKey == 'ERR_REPEAT'">
                        <h3>You have already submitted</h3>
                    </div>
                </div>

                <div class="show-section" v-if="loaded">
                    <div v-for="question in questions">
                        <Question :question="question" :currentStep="currentStep" v-show="currentStep == question.Index"
                            @nextStep="nextStep" @prevStep="prevStep" @addAnswer="addAnswer" @submit="submit"
                            :totalCount="questions.length" />
                    </div>
                    <div v-if="questions == null || questions.length == 0">
                        <h3>No questions!!!</h3>
                    </div>
                    <section class="container" v-if="loaded && showAnswer">
                        <div class="container">
                            <div class="row text-center">
                                <h2>You have successfully submitted</h2>
                                <p>Your result is {{result}}%</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import Question from '@/components/Question'
    export default {
        name: 'Quiz',
        components: {
            Question
        },
        data() {
            return {
                questions: [],
                currentStep: 1,
                answers: {},
                result: 0,
                loaded: false,
                showAnswer: false,
                sessionID: "",
                errorKey: "",

            }
        },
        mounted() {
            const sessionID = this.$route.params.sessionID
            if (!sessionID || sessionID == '') {
                window.location.href = "/login"
            }
            this.sessionID = sessionID
            let that = this
            this.getQuizzes().then(function (res) {
                that.questions = res.data
                that.loaded = true
                if (that.questions == null || that.questions.length == 0) {
                    return
                }
                var i = 1
                that.questions.forEach(function (element) {
                    element.Index = i;
                    i++
                });
                // console.log(that.questions)
            })
        },
        methods: {
            async getQuizzes() {
                const responseRaw = await fetch(process.env.VUE_APP_ROOT_URL + "/quiz?sessionID="+this.sessionID, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                });
                if (responseRaw.status == 401) {
                    window.location.href = "/login"
                }
                const responseJson = await responseRaw.json()
                if (responseRaw.status == 500) {
                    if(responseJson.key == "ERR_REPEAT") {
                        this.errorKey = "ERR_REPEAT"
                    }
                    return
                }
                return responseJson
            },
            nextStep() {
                this.currentStep++
            },
            prevStep() {
                this.currentStep--
            },
            addAnswer(index, answer) {
                this.answers[index] = answer
                console.log(this.answers)
            },
            async submit() {
                const query = {
                    answers: JSON.stringify(this.answers),
                    sessionID: this.sessionID
                }
                const responseRaw = await fetch(process.env.VUE_APP_ROOT_URL + "/quiz/grade", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                    body: JSON.stringify(query)
                });
                const responseJson = await responseRaw.json()
                // console.log(responseJson.data)
                this.result = responseJson.data
                this.showAnswer = true
            }
        },
    }
</script>