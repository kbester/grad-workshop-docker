<template>
    <div>
      <h2>Employees</h2>
      <ul>
        <li v-for="employee in employees" :key="employee.id">
          {{ employee.name }} - {{ employee.position }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EmployeeList',
    data() {
      return {
        employees: []
      };
    },
    mounted() {
      this.fetchEmployees();
    },
    methods: {
      fetchEmployees() {
        axios.get('http://localhost:3000/employees')
          .then(response => {
            this.employees = response.data;
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }
  };
  </script>