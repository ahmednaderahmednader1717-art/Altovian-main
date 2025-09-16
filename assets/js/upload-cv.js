
    (function () {
      const input = document.getElementById('pdfInput');
      const dropzone = document.getElementById('dropzone');
      const fileInfo = document.getElementById('fileInfo');
      const errorMsg = document.getElementById('errorMsg');
      const successMsg = document.getElementById('successMsg');
      const uploadBtn = document.getElementById('uploadBtn');
      const clearBtn = document.getElementById('clearBtn');
      const browseBtn = document.getElementById('browseBtn');

      const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

      function bytesToNice(b) {
        if (b >= 1024 * 1024) return (b / (1024 * 1024)).toFixed(2) + ' MB';
        if (b >= 1024) return (b / 1024).toFixed(1) + ' KB';
        return b + ' B';
      }

      function resetState() {
        input.value = '';
        fileInfo.style.display = 'none';
        fileInfo.innerHTML = '';
        errorMsg.style.display = 'none';
        errorMsg.textContent = '';
        successMsg.style.display = 'none';
        successMsg.textContent = '';
        uploadBtn.disabled = true;
        clearBtn.disabled = true;
      }

      function showFile(file) {
        const pill = document.createElement('div');
        pill.className = 'file-pill';
        pill.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" opacity="0.7"/>
            <path d="M14 2v6h6" stroke="currentColor" opacity="0.9"/>
          </svg>
          <div>
            <div>${file.name}</div>
            <div class="pill-badge">${bytesToNice(file.size)} · application/pdf</div>
          </div>
        `;
        fileInfo.innerHTML = '';
        fileInfo.appendChild(pill);
        fileInfo.style.display = 'block';
      }

      function validate(file) {
        if (!file) return false;
        if (file.type !== 'application/pdf') {
          errorMsg.textContent = 'Only PDF files are allowed.';
          errorMsg.style.display = 'block';
          return false;
        }
        if (file.size > MAX_BYTES) {
          errorMsg.textContent = 'File is too large. Max size is 10 MB.';
          errorMsg.style.display = 'block';
          return false;
        }
        errorMsg.style.display = 'none';
        return true;
      }

      function handleFiles(files) {
        const file = files && files[0];
        if (!file) return;
        if (!validate(file)) {
          uploadBtn.disabled = true;
          clearBtn.disabled = false;
          successMsg.style.display = 'none';
          return;
        }
        showFile(file);
        uploadBtn.disabled = false;
        clearBtn.disabled = false;
        successMsg.style.display = 'none';
      }

      // Click helpers
      browseBtn.addEventListener('click', () => input.click());
      clearBtn.addEventListener('click', resetState);

      // File input change
      input.addEventListener('change', (e) => handleFiles(e.target.files));

      // Drag & drop
      ['dragenter', 'dragover'].forEach(evt => {
        dropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add('dragover');
        });
      });
      ['dragleave', 'dragend'].forEach(evt => {
        dropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove('dragover');
        });
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
      });

      // Keyboard activation for accessibility
      dropzone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          input.click();
        }
      });

      // Fake upload handler (since no backend here)
      uploadBtn.addEventListener('click', async () => {
        if (!input.files[0]) return;
        uploadBtn.disabled = true;
        successMsg.textContent = 'Uploading… (demo)';
        successMsg.style.display = 'block';

        // Simulate latency
        await new Promise(r => setTimeout(r, 900));

        successMsg.textContent = 'Upload ready to send to your server endpoint.';
        uploadBtn.disabled = false;
      });

      // Initialize
      resetState();
    })();

