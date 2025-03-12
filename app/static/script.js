document.addEventListener('DOMContentLoaded', () => {
  const curlInput = document.getElementById('curlInput');
  const fetchInput = document.getElementById('fetchInput');
  const librarySelect = document.getElementById('librarySelect');
  const convertButton = document.getElementById('convertButton');
  const pythonOutput = document.getElementById('pythonOutput');
  const copyButton = document.getElementById('copyButton');
  const curlTabButton = document.querySelector('.tab-button[data-tab="curl"]');
  const fetchTabButton = document.querySelector('.tab-button[data-tab="fetch"]');
  const curlTab = document.getElementById('curl-tab');
  const fetchTab = document.getElementById('fetch-tab');
  const clearCurlButton = document.getElementById('clearCurl');
  const clearFetchButton = document.getElementById('clearFetch');
  const notification = document.getElementById('notification');

  // Function to switch tabs
  function switchTab(tabName) {
    if (tabName === 'curl') {
      curlTab.style.display = 'block';
      fetchTab.style.display = 'none';
      curlTabButton.classList.add('active');
      fetchTabButton.classList.remove('active');
      curlInput.value = ''; // Clear input
    } else if (tabName === 'fetch') {
      curlTab.style.display = 'none';
      fetchTab.style.display = 'block';
      fetchTabButton.classList.add('active');
      curlTabButton.classList.remove('active');
      fetchInput.value = ''; // Clear input
    }
  }

  // Event listeners for tab buttons
  curlTabButton.addEventListener('click', () => {
    switchTab('curl');
  });

  fetchTabButton.addEventListener('click', () => {
    switchTab('fetch');
  });

  // Clear input buttons
  clearCurlButton.addEventListener('click', () => {
    curlInput.value = '';
  });

  clearFetchButton.addEventListener('click', () => {
    fetchInput.value = '';
  });


  convertButton.addEventListener('click', async () => {
    let command;
    let requestType;
    if (curlTabButton.classList.contains('active')) {
      command = curlInput.value;
      requestType = 'curl';
    } else {
      command = fetchInput.value;
      requestType = 'fetch';
    }

    const dataStr = command.replace(/\n/g, ' ');
    const selectedLibrary = librarySelect.value;

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "request_type": requestType,
          "target": selectedLibrary,
          "data_str": dataStr
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      pythonOutput.value = data.request_string;

    } catch (error) {
      pythonOutput.value = `Error: ${error}`;
    }
  });

  copyButton.addEventListener('click', () => {
    pythonOutput.select();
    pythonOutput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    
    // Show notification
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000); // Hide after 3 seconds
  });
});