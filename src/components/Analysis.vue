<template>
<v-container fluid>
<v-row dense>
  <v-col cols="12">
        <v-card>
          <v-card-actions>
            <div
              class="flex-grow-1 text-center" 
            >
            <v-btn text @click="randomize()">Randomize</v-btn>
            </div>
          </v-card-actions>
        </v-card>
  </v-col>
  <v-col cols="12" sm="6" lg="3">
        <v-card>
          <v-card-title>VCS</v-card-title>
          <v-card-text>
            <v-select
              v-model="selectedVCS"
              :items="projectValueCreationStrategies"
              item-text="name"
              label="VCS"
              dense
              return-object
              @change="fillDataMetrics()"
            ></v-select>
          </v-card-text>
        </v-card>
  </v-col>
  <v-col cols="12" sm="6" lg="3">
        <v-card>
          <v-card-title>Flexibility</v-card-title>
          <v-card-text>
            <div
              class="display-3 flex-grow-1 text-center" 
              :class="{ 'green--text': metrics.flexibility>1 , 'red--text': metrics.flexibility<1 }"
            >
              {{ selectedVCS.metrics.flexibility }}
            </div>
          </v-card-text>
        </v-card>
  </v-col>
  <v-col cols="12" sm="6" lg="3">
        <v-card>
          <v-card-title>Volume</v-card-title>
          <v-card-text>
            <div
              class="display-3 flex-grow-1 text-center" 
              :class="{ 'green--text': metrics.volume<1 , 'red--text': metrics.volume>1 }"
            >
              {{ selectedVCS.metrics.volume }}
            </div>
          </v-card-text>
        </v-card>
  </v-col>
  <v-col cols="12" sm="6" lg="3">
        <v-card>
          <v-card-title>Perceived Quality</v-card-title>
          <v-card-text>
            <div
              class="display-3 flex-grow-1 text-center" 
              :class="{ 'green--text': metrics.quality>1 , 'red--text': metrics.quality<1 }"
            >
              {{ selectedVCS.metrics.quality }}
            </div>
          </v-card-text>
        </v-card>
  </v-col>
</v-row>
<v-row dense>
  <v-col cols="12" sm="6" lg="6">
        <v-card>
            <radar-chart :chart-data="radarDataCollection" :options="radarOptions"></radar-chart>
        </v-card>
  </v-col>
  <v-col cols="12" sm="6" lg="6">
        <v-card>
            <line-chart :chart-data="radarDataCollection" :options="lineOptions"></line-chart>
        </v-card>
  </v-col>
  <v-col cols="12" sm="6" lg="6" v-if="false">
        <v-card>
            <scatter-chart :chart-data="scatterDataCollection" :options="scatterOptions"></scatter-chart>
        </v-card>
  </v-col>
  <v-col cols="12" sm="6" lg="6" v-if="false">
        <v-card>
            <bar-chart :chart-data="scatterDataCollection" :options="barOptions"></bar-chart>
        </v-card>
  </v-col>
</v-row>
</v-container>
</template>

<script>
import {mapState} from 'vuex';

  import RadarChart from './RadarChart.js'
  import ScatterChart from './ScatterChart.js'
  import LineChart from './LineChart.js'
  import BarChart from './BarChart.js'

  export default {
    components: {
      RadarChart,
      ScatterChart,
      LineChart,
      BarChart
    },
    data () {
      return {
        selectedVCS: {
          id: 2,
          name: "Current solution",
          description: "Maintain performance levels, without changing the current technology",
          ranking: [1, 4, 2, 8, 5, 7, 6, 3, 10, 9],
          metrics: 
            {
              flexibility: 1,
              volume: 1,
              quality: 1
            }
        },
        metrics: {
          flexibility: 1,
          volume: 1,
          quality: 1,
        },
        radarDataCollection: null,
        radarOptions: {
            title: {
                display: true,
                text: 'Needs radar chart'
            },
        },
        scatterDataCollection: null,
        scatterOptions: {
            title: {
                display: true,
                text: 'Needs scatter chart'
            },
        },
        lineDataCollection: null,
        lineOptions: {
            title: {
                display: true,
                text: 'Needs line chart'
            },
            scales: {
                xAxes: [{
                      type: 'category', // MANDATORY TO SHOW YOUR POINTS! (THIS IS THE IMPORTANT BIT)
                      labels: ['Need 1', 'Need 2', 'Need 3', 'Need 4', 'Need 5', 'Need 6', 'Need 7', 'Need 8'],
                      display: true, // mandatory
                      scaleLabel: {
                          display: true, // mandatory
                          labelString: 'Needs' // optional 
                      },
                }], 
                yAxes: [{ // and your y axis customization as you see fit...
                  display: true,
                  scaleLabel: {
                        display: true,
                        labelString: 'Merit'
                  }
              }],
          }
        },
        barDataCollection: null,
        barOptions: {
            title: {
                display: true,
                text: 'Needs bar chart'
            },
        }
      }
    },
    computed: {
      projectValueCreationStrategies(){
        return this.$store.getters.projectValueCreationStrategies;
      },
      ...mapState([
        'selectedProject',
      ]),
    },
    mounted () {
      this.randomize()
    },
    methods: {
      fillDataRadar () {
        this.radarDataCollection = {
          labels: ['Need 1', 'Need 2', 'Need 3', 'Need 4', 'Need 5', 'Need 6', 'Need 7', 'Need 8'],
          datasets: [
            {
              label: 'VCS 1',
              borderColor: '#F44336',
              backgroundColor: '#F4433622',
              lineTension: 0,
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'VCS 2',
              borderColor: '#4CAF50',
              backgroundColor: '#4CAF5022',
              lineTension: 0,
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            },
            {
              label: 'VCS 3',
              borderColor: '#2196F3',
              backgroundColor: '#2196F322',
              lineTension: 0,
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'VCS 4',
              borderColor: '#9C27B0',
              backgroundColor: '#9C27B022',
              lineTension: 0,
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      fillDataScatter () {
        this.scatterDataCollection = {
            datasets: [{
                label: 'VCS 1',
                borderColor: 'red',
                data: [{
                    x: this.getRandomInt(),
                    y: this.getRandomInt()
                }, {
                    x: this.getRandomInt(),
                    y: this.getRandomInt()
                }, {
                    x: this.getRandomInt(),
                    y: this.getRandomInt()
                }]
            },
            {
                label: 'VCS 2',
                borderColor: 'blue',
                data: [{
                    x: this.getRandomInt(),
                    y: this.getRandomInt()
                }, {
                    x: this.getRandomInt(),
                    y: this.getRandomInt()
                }, {
                    x: this.getRandomInt(),
                    y: this.getRandomInt()
                }]
            }
            ]
        }
      },
      fillDataLine () {
        this.lineDataCollection = {
            datasets: [{
                label: 'VCS 1',
                borderColor: 'red',
                labels: ['Need 1','Need 2','Need 3'],
                data: [this.getRandomInt(),this.getRandomInt(),this.getRandomInt()]
            },
            {
                label: 'VCS 2',
                borderColor: 'blue',
                labels: ['Need 1','Need 2','Need 3'],
                data: [this.getRandomInt(),this.getRandomInt(),this.getRandomInt()]
            }
            ]
        }
      },
      fillDataMetrics () {
        this.metrics = {
          flexibility: this.selectedVCS.metrics.flexibility,
          volume: this.selectedVCS.metrics.volume,
          quality: this.selectedVCS.metrics.quality,
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      getRandomFloat () {
        return this.round(Math.random() + 0.5, 2)
      },
      round (value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      },
      randomize () {
        //this.fillDataMetrics();
        this.fillDataRadar();
        this.fillDataScatter();
      },
    }
  }
</script>