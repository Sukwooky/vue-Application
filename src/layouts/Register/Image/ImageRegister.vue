<template>
    <v-container fluid>

        <div>
            <v-row align="center" justify="center">
                <v-col cols="auto">
                    <h3>카메라 등록</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <v-file-input type="file" accept="image/*" capture="camera"/>
                </v-col>
            </v-row>
        </div>

    </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>