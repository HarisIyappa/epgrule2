import React, { useState, useEffect } from 'react';

const EditRuleModal = ({ rule, closeModal }) => {
  const [editedRule, setEditedRule] = useState(rule);
  const [conditions, setConditions] = useState(rule["Conditions"] ? rule["Conditions"]["AND"] : []);
  const [result, setResult] = useState(rule["Result"] || { "Parameter": "", "End Result": "" });

  useEffect(() => {
    if (rule.isNew) {
      setEditedRule({ ...rule, "Rule Desc": '' });
    }
  }, [rule]);

  const handleConditionChange = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index][field] = value;
    setConditions(newConditions);
  };

  const addCondition = () => {
    setConditions([...conditions, { "Left Parameter": '', "Expression": '', "Right Parameter": '' }]);
  };

  const deleteCondition = (index) => {
    if (index > 0) {  // Prevent deletion of the first condition
      const newConditions = conditions.filter((_, i) => i !== index);
      setConditions(newConditions);
    }
  };

  const handleSave = () => {
    const updatedRule = { ...editedRule, Conditions: { AND: conditions }, Result: result };
    console.log('Updated Rule:', updatedRule);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Rule: {editedRule["Rule Title"]}</h2>
        <label>
          Rule Description:
          <textarea
            value={editedRule["Rule Desc"]}
            onChange={(e) => setEditedRule({ ...editedRule, "Rule Desc": e.target.value })}
            style={{ marginBottom: '10px' }} // Minimized space
          />
        </label>
        <h3>Conditions:</h3>
        {conditions.map((condition, index) => (
          <div key={index} className="condition-row">
            <label>
              Left Parameter:
              <select
                value={condition["Left Parameter"]}
                onChange={(e) => handleConditionChange(index, "Left Parameter", e.target.value)}
              >
                <option value="current_movie_pc_rating">Current Movie PC Rating</option>
                <option value="previous_movie_pc_rating">Previous Movie PC Rating</option>
                <option value="current_movie_genres">Current Movie Genres</option>
                <option value="previous_movie_genres">Previous Movie Genres</option>
                <option value="current_movie_cast">Current Movie Cast</option>
                <option value="previous_movie_cast">Previous Movie Cast</option>
                <option value="previous_movie1_cast">Previous Movie 1 Cast</option>
              </select>
            </label>
            <label>
              Expression:
              <select
                value={condition["Expression"]}
                onChange={(e) => handleConditionChange(index, "Expression", e.target.value)}
              >
                <option value="==">==</option>
                <option value="IN">IN</option>
                <option value="!=">!=</option>
              </select>
            </label>
            <label>
              Right Parameter:
              <select
                multiple = {true}
                value={condition["Right Parameter"]}
                onChange={(e) => handleConditionChange(index, "Right Parameter", e.target.value)}
            
              >
                {condition["Left Parameter"] === "current_movie_pc_rating" && (
                  <>
                    <option value="R">R</option>
                    <option value="NC-17">NC-17</option>
                    <option value="PG">PG</option>
                    <option value="G">G</option>
                  </>
                )}
                {condition["Left Parameter"] === "current_movie_genres" && (
                  <>
                    <option value="Horror">Horror</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Action">Action</option>
                  </>
                )}
                {condition["Left Parameter"] === "current_movie_cast" && (
                  <>
                    <option value="Actor1">Actor1</option>
                    <option value="Actor2">Actor2</option>
                  </>
                )}
                {/* Add more condition checks and options as necessary */}
              </select>
            </label>
            <label>
              Logic Operator:
              <select
                value={condition["Logic Operator"] || "AND"}
                onChange={(e) => handleConditionChange(index, "Logic Operator", e.target.value)}
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            </label>
            <button onClick={() => deleteCondition(index)} disabled={index === 0}>Delete Condition</button>
          </div>
        ))}
        <button onClick={addCondition}>Add Condition</button>
        <br />
        <label>
          Result Parameter:
          <select
            value={result["Parameter"]}
            onChange={(e) => setResult({ ...result, "Parameter": e.target.value })}
          >
            <option value="Schedule">Schedule</option>
            <option value="Time Slot">Time Slot</option>
          </select>
        </label>
        <label>
          End Result:
          <select
            value={result["End Result"]}
            onChange={(e) => setResult({ ...result, "End Result": e.target.value })}
          >
            <option value="Invalid">Invalid</option>
            <option value="Valid">Valid</option>
          </select>
        </label>
        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default EditRuleModal;