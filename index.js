const syllableList = document.getElementById('syllableList');
const searchInput = document.getElementById('searchInput');
const totalCountElement = document.getElementById('totalCount');
const sortToggle = document.getElementById('sortToggle');

let totalCount = 0;
let ascendingOrder = true;

fetch('syllables.json')
    .then(response => response.json())
    .then(data => {
        
        function updateList(searchTerm) {
            syllableList.innerHTML = '';
            totalCount = 0;

            data.sort((a, b) => {
                const comparison = ascendingOrder ? 1 : -1;
                const jyutpingComparison = comparison * a.jyutping.localeCompare(b.jyutping);
                if (jyutpingComparison !== 0) return jyutpingComparison;

                const initialComparison = comparison * a.initial.localeCompare(b.initial);
                if (initialComparison !== 0) return initialComparison;

                return comparison * a.final.localeCompare(b.final);
            });

            data.filter(syllable => {
                return (
                    syllable.jyutping.includes(searchTerm) ||
                    syllable.initial.includes(searchTerm) ||
                    syllable.final.includes(searchTerm)
                );
            }).forEach(syllable => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${syllable.jyutping}</td>
                    <td>${syllable.initial}</td>
                    <td>${syllable.final}</td>
                `;
                syllableList.appendChild(row);
                totalCount++;
            });

            totalCountElement.textContent = `Total: ${totalCount}`;
        }

        updateList('');

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            updateList(searchTerm);
        });

        sortToggle.addEventListener('click', () => {
            ascendingOrder = !ascendingOrder;
            updateList(searchInput.value.trim().toLowerCase());
        });
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
