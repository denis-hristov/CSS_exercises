document.addEventListener("DOMContentLoaded", () => {
  fetch('data/data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load data.json");
      }
      return response.json();
    })
    .then(jsonData => {
      const gridBody = document.getElementById('data-grid');
      gridBody.innerHTML = '';

      // Групиране по Col001
      const groupedData = {};

      jsonData.data[0].forEach(row => {
        const id = row.Col001;
        if (!groupedData[id]) {
          groupedData[id] = {
            Col001: row.Col001,
            Col005: row.Col005,
            answers: [],
            totalResponses: 0
          };
        }

        groupedData[id].answers.push(row.Col002);
        groupedData[id].totalResponses += row.Col003;
      });

      // Генериране на таблица от групираните данни
      Object.values(groupedData).forEach(group => {
        const tr = document.createElement('tr');

        const qID = document.createElement('td');
        qID.textContent = group.Col001;
        tr.appendChild(qID);

        const qText = document.createElement('td');
        qText.textContent = group.Col005;
        tr.appendChild(qText);

        const ansText = document.createElement('td');
        ansText.textContent = group.answers.join(', ');
        tr.appendChild(ansText);

        const responses = document.createElement('td');
        responses.textContent = group.totalResponses;
        tr.appendChild(responses);

        gridBody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error loading or parsing JSON:', error);
    });
});
