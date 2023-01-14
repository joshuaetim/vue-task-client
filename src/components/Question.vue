<template>
    <section class="steps-inner">
        <div class="wrapper">
            <div class="step-heading">
                <h2>Quiz</h2>
                <p>Fill out this Trivia quiz for fun!</p>
            </div>
            <div class="step-bar">
                <span class="step-counter">
                    Question {{currentStep}} / {{totalCount}}
                </span>
                <!-- <div class="step-bar-inner">
                    <div class="step-bar-move step-move m25"></div>
                </div> -->
            </div>
            <form action="#" method="post">
                <div class="form-heading">
                    {{question.question}}
                </div>
                <div class="form-inner">
                <div v-for="(option, index) in optionsArray">
                    <label class="form-input" :for="question.Index + `` + option">
                        <input type="radio" :name="question.Index" :id="question.Index + `` + option" v-model="answer" :value="(index+1).toString()">
                        {{option}}
                    </label>
                </div>
                </div>

                <!-- next-prev-btn -->
                <div class="form-buttons">
                <button type="button" class="prev" v-if="question.Index != 1" @click="prevStep"><i class="fa-solid fa-arrow-left"></i>previous question</button>
                    <button type="button" class="next" v-if="question.Index < totalCount" @click="nextStep">next question<i
                            class="fa-solid fa-arrow-right"></i></button>
                            <button type="button" class="next" v-if="question.Index == totalCount" @click="submit">Submit<i
                            class="fa-solid fa-arrow-right"></i></button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Quiz',
        props: {
            question: Object,
            currentStep: Number,
            totalCount: Number
        },
        data() {
            return {
                optionsArray: [],
                answer: ''
            }
        },
        mounted() {
            let options = this.$props.question.options
            this.optionsArray = options.split(/\n/)
            // console.log(this.$props.totalCount)
            // console.log(this.optionsArray)
            // console.log(this.$props.question)
        },
        methods: {
            nextStep() {
                if (this.answer == "") {
                    return
                }
                let index = this.$props.question.ID.toString()
                this.$emit("addAnswer", index, this.answer)
                // alert(this.answer)
                this.$emit('nextStep')
            },
            prevStep() {
                if (this.answer != "") {
                    let index = this.$props.question.ID.toString()
                    this.$emit("addAnswer", index, this.answer)
                }
                this.$emit('prevStep')
            },
            submit() {
                this.nextStep()
                this.$emit('submit')
            },
            isFirst() {
                return this.$props.currentStep == 1
            },
            isLast() {
                this.$props.currentStep >= this.$props.questions.length
            },
        }
    }
</script>