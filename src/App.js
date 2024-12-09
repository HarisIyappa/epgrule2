import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import RuleTable from './RuleTable';
import './App.css';
import './RuleTable.css';
//import UserList from './EditRuleModal'
const rulesData =  
[
  {
  "Rule Id": "OM1",
  "Rule Title": "No Consecutive Adult-rated Movies",
  "Rule Desc": "Adult-rated Movies should not be scheduled consecutively",
  "Rule Short Desc" : "Adult Rated Movies should not be scheduled consecutively",
  "Conditions": {
      "AND": [
          {
              "Left Parameter": "current_movie_pc_rating",
              "Expression": "IN",
              "Right Parameter": ["R", "NC-17"]
          },
          {
              "Left Parameter": "previous_movie_pc_rating",
              "Expression": "IN",
              "Right Parameter": ["R", "NC-17"]
          }
      ]
  },
  "Result": {
      "Parameter": "Schedule",
      "End Result": "Invalid"
  }
},

  {
      "Rule Id": "OM2",
      "Rule Title": "No Consecutive Horror Movies",
      "Rule Desc": "Horror movies should not be scheduled consecutively",
      "Rule Short Desc" : "Horror movies should not be scheduled consecutively",
      "Conditions": {
          "AND": [
              {
                  "Left Parameter": "current_movie_genres",
                  "Expression": "==",
                  "Right Parameter": "Horror"
              },
              {
                  "Left Parameter": "previous_movie_genres",
                  "Expression": "==",
                  "Right Parameter": "Horror"
              }
          ]
      },
      "Result": {
          "Parameter": "Schedule",
          "End Result": "Invalid"
      }
  },
  {
      "Rule Id": "OM3",
      "Rule Title": "No Consecutive Kids Movies",
      "Rule Desc": "Kids movies cannot be telecasted one after another",
      "Rule Short Desc" : "Kids movies cannot be telecasted one after another",
      "Conditions": {
          "AND": [
              {
                  "Left Parameter": "current_movie_genres",
                  "Expression": "==",
                  "Right Parameter": "Cartoon"
              },
              {
                  "Left Parameter": "previous_movie_genres",
                  "Expression": "==",
                  "Right Parameter": "Cartoon"
              }
          ]
      },
      "Result": {
          "Parameter": "Schedule",
          "End Result": "Invalid"
      }
  },
  {
      "Rule Id": "OM4",
      "Rule Title": "Limit Consecutive Movies by Cast",
      "Rule Desc": "No more than 3 movies of the same cast can be telecasted consecutively",
      "Rule Short Desc" : "No more than 3 movies of the same cast can be telecasted consecutively",
      "Conditions": {
          "AND": [
              {
                  "Left Parameter": "current_movie_cast",
                  "Expression": "==",
                  "Right Parameter": "previous_movie_cast"
              },
              {
                  "Left Parameter": "current_movie_cast",
                  "Expression": "==",
                  "Right Parameter": "previous_movie1_cast"
              }
          ]
      },
      "Result": {
          "Parameter": "Schedule",
          "End Result": "Invalid"
      }
  },
  {
      "Rule Id": "OM5",
      "Rule Title": "Limit Consecutive Movies by genre",
      "Rule Desc": "No more than 3 movies of the same genre can be telecasted consecutively",
      "Rule Short Desc" : "No more than 3 movies of the same genre can be telecasted consecutively",
      "Conditions": {
          "AND": [
              {
                  "Left Parameter": "current_movie_genres",
                  "Expression": "==",
                  "Right Parameter": "previous_movie_genres"
              },
              {
                  "Left Parameter": "current_movie_genres",
                  "Expression": "==",
                  "Right Parameter": "previous_movie1_genres"
              }
          ]
      },
      "Result": {
          "Parameter": "Schedule",
          "End Result": "Invalid"
      }
  }
]


 
const App = () => {

  return (
<div>
{/* <RuleTable rules={rulesData} /> */}
<BrowserRouter>  <Routes>
<Route path="/neighbours" element={<RuleTable rules={rulesData}/>} />
  </Routes>
        
</BrowserRouter>
</div>

  );

};
 
export default App;

 