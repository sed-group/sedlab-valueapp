import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    drawer: false,
    selectedProject: [{"item": null}, {value: false}],
    projects: [],
    valueDrivers: [
      {
        name: "Volume",
        unit: "mm^3",
        type: "FR",
        verificationMethod: "CAD Model",
        valueDimension: ""
      },
      {
        name: "Position",
        unit: "(X mm, Y mm, Z mm)",
        type: "FR",
        verificationMethod: "CAD Model",
        valueDimension: ""
      },
      {
        name: "Flexibility",
        unit: "-",
        type: "NFR",
        verificationMethod: "CAD Model",
        valueDimension: ""
      },
      {
        name: "Accesibility",
        unit: "-",
        type: "NFR",
        verificationMethod: "Simulink/Modelica",
        valueDimension: ""
      },
      {
        name: "Perceived quality",
        unit: "-",
        type: "NFR",
        verificationMethod: "Simulink/Modelica",
        valueDimension: ""
      },
      {
        name: "Energy",
        unit: "Wh",
        type: "FR",
        verificationMethod: "CAD Model",
        valueDimension: ""
      },
      {
        name: "Noise",
        unit: "-",
        type: "NFR",
        verificationMethod: "CAD Model",
        valueDimension: ""
      },
      {
        name: "Dry Mass",
        unit: "kg",
        type: "FR",
        verificationMethod: "CAD Model",
        valueDimension: ""
      },
      {
        name: "Propellant Mass",
        unit: "kg",
        type: "FR",
        verificationMethod: "CAD Model",
        valueDimension: ""
      },
      {
        name: "Specific Impulse Isp",
        unit: "kg/(N·s)",
        type: "FR",
        verificationMethod: "Simulink/Modelica",
        valueDimension: ""
      },
    ],
    quantifiedObjectives: [
      {
        name: "QO 1",
        target: "100"
      }
    ],
    systemLifeCycleProcesses: [
      {
        clause: "6.1.1",
        processType: "Agreement Processes",
        processName: "Acquisition Process",
      },
      {
        clause: "6.1.2",
        processType: "Agreement Processes",
        processName: "Supply Process",
      },
      {
        clause: "6.2.1",
        processType: "Organizational Project-Enabling Processes",
        processName: "Life Cycle Model Management Process",
      },
      {
        clause: "6.2.2",
        processType: "Organizational Project-Enabling Processes",
        processName: "Infrastructure Management Process",
      },
      {
        clause: "6.2.3",
        processType: "Organizational Project-Enabling Processes",
        processName: "Project Portfolio Management Process",
      },
      {
        clause: "6.2.4",
        processType: "Organizational Project-Enabling Processes",
        processName: "Human Resource Management Process",
      },
      {
        clause: "6.2.5",
        processType: "Organizational Project-Enabling Processes",
        processName: "Quality Management Process",
      },
      {
        clause: "6.3.1",
        processType: "Project Processes",
        processName: "Project Planning Process",
      },
      {
        clause: "6.3.2",
        processType: "Project Processes",
        processName: "Project Assessment and Control Process",
      },
      {
        clause: "6.3.3",
        processType: "Project Processes",
        processName: "Decision Management Process",
      },
      {
        clause: "6.3.4",
        processType: "Project Processes",
        processName: "Risk Management Process",
      },
      {
        clause: "6.3.5",
        processType: "Project Processes",
        processName: "Configuration Management Process",
      },
      {
        clause: "6.3.6",
        processType: "Project Processes",
        processName: "Information Management Process",
      },
      {
        clause: "6.3.7",
        processType: "Project Processes",
        processName: "Measurement Process",
      },
      {
        clause: "6.4.1",
        processType: "Technical Processes",
        processName: "Stakeholder Requirements Definition Process",
      },
      {
        clause: "6.4.2",
        processType: "Technical Processes",
        processName: "Requirements Analysis Process",
      },
      {
        clause: "6.4.3",
        processType: "Technical Processes",
        processName: "Architectural Design Process",
      },
      {
        clause: "6.4.4",
        processType: "Technical Processes",
        processName: "Implementation Process",
      },
      {
        clause: "6.4.5",
        processType: "Technical Processes",
        processName: "Integration Process",
      },
      {
        clause: "6.4.6",
        processType: "Technical Processes",
        processName: "Verification Process",
      },
      {
        clause: "6.4.7",
        processType: "Technical Processes",
        processName: "Transition Process",
      },
      {
        clause: "6.4.8",
        processType: "Technical Processes",
        processName: "Validation Process",
      },
      {
        clause: "6.4.9",
        processType: "Technical Processes",
        processName: "Operation Process",
      },
      {
        clause: "6.4.10",
        processType: "Technical Processes",
        processName: "Maintenance Process",
      },
      {
        clause: "6.4.11",
        processType: "Technical Processes",
        processName: "Disposal Process",
      },
    ],
  },
  actions: {
      loadProjects({commit}) {
          axios
            .get('https://my-json-server.typicode.com/sed-group/sedlab-valueapp/projects')
            .then(data => {
                console.log(data.data)
                let projects = data.data
                commit('SET_PROJECTS', projects)
            })
            .catch(error => {
                console.log(error)
            })
      },
  },
  mutations: {
    SET_PROJECTS (state, projects) {
        state.projects = projects
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_SELECTED_PROJECT (state, payload) {
      state.selectedProject = payload
    },
  },
  getters: {
    getProject(state) {
      return state.selectedProject.item
    },
    projectStakeholders(state) {
      var projectStakeholders = state.selectedProject.item.stakeholders;
      return projectStakeholders;
    },
    projectNeeds(state) {
      var projectNeeds = state.selectedProject.item.needs;
      return projectNeeds;
    },
    projectArchitectures(state) {
      var projectArchitectures = state.selectedProject.item.architectures;
      return projectArchitectures;
    },
    projectValueCreationStrategies(state) {
      var projectValueCreationStrategies = state.selectedProject.item.valueCreationStrategies;
      return projectValueCreationStrategies;
    }
  }
})