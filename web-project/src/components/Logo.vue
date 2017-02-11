<template>
    <div class="app-logo">
        <span>F</span>
        <span>ile</span>
        <span>B</span>
        <span>us</span>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.app-logo {
    /*line-height: 50px;*/
    height: 20px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;

    color: inherit;

    &>span {
        display: block;
    }
}
</style>
