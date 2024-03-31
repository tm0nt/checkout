<template>
        <v-bottom-navigation :elevation="0" fixed bg-color="background">
            <v-btn value="config" to="/dashboard/ajustes">
                <v-icon>mdi-cog</v-icon>

                <span>Ajustes</span>
            </v-btn>

            <v-btn value="home" to="/dashboard">
                <v-icon>mdi-home</v-icon>

                <span>Home</span>
            </v-btn>

            <v-btn value="produtos" to="/dashboard/produtos">
                <v-icon>mdi-plus</v-icon>

                <span>Produtos</span>
            </v-btn>
        </v-bottom-navigation>
</template>
