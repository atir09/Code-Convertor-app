let editor;
const languageSelect = document.getElementById('language-select');
const convertBtn = document.getElementById('convert-btn');
const debugBtn = document.getElementById('debug-btn');
const qualityBtn = document.getElementById('quality-btn');
const output = document.getElementById('output');

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.27.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: '',
        language: 'javascript',
        theme: 'vs-dark'
    });
});

convertBtn.addEventListener('click', async () => {
    const code = editor.getValue();
    const selectedLanguage = languageSelect.value;

    try {
        toggleOutputLoader(true); // Show the loading spinner
        const convertedCode = await convertCodeToLanguage(code, selectedLanguage);
        output.textContent = `Converted code in ${selectedLanguage}:\n${convertedCode}`;
    } catch (error) {
        output.textContent = 'Error converting code.';
        console.error('Error generating code conversion:', error.message);
    } finally {
        toggleOutputLoader(false); // Hide the loading spinner
    }
});

debugBtn.addEventListener('click', async () => {
    const code = editor.getValue();
    
    try {
        toggleOutputLoader(true); // Show the loading spinner
        const convertedCode = await DebugCode(code);
        output.textContent = `Debugging...:\n${convertedCode}`;
    } catch (error) {
        output.textContent = 'Error converting code.';
        console.error('Error generating code conversion:', error.message);
    } finally {
        toggleOutputLoader(false); // Hide the loading spinner
    }
});

qualityBtn.addEventListener('click', async () => {
    const code = editor.getValue();

    try {
        toggleOutputLoader(true); // Show the loading spinner
        const convertedCode = await QualityCode(code);
        output.textContent = `Checking code quality...:\n${convertedCode}`;
    } catch (error) {
        output.textContent = 'Error converting code.';
        console.error('Error generating code conversion:', error.message);
    } finally {
        toggleOutputLoader(false); // Hide the loading spinner
    }
});

function toggleOutputLoader(show) {
    const outputLoader = document.getElementById('output-loader');
    if (show) {
        outputLoader.style.display = 'block';
    } else {
        outputLoader.style.display = 'none';
    }
}

async function convertCodeToLanguage(inputCode, targetLanguage) {
    const url = 'https://code-converter-be.onrender.com/convert-code';
    const data = {
        code: inputCode,
        targetLanguage: targetLanguage
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        return responseData.convertedCode;
    } catch (error) {
        console.error('Error converting code:', error.message);
        throw error;
    }
}

async function DebugCode(inputCode) {
    const url = 'https://code-converter-be.onrender.com/debug-code';
    const data = {
        code: inputCode,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        return responseData.convertedCode;
    } catch (error) {
        console.error('Error converting code:', error.message);
        throw error;
    }
}
async function QualityCode(inputCode) {
    const url = 'https://code-converter-be.onrender.com/check-code-quality';
    const data = {
        code: inputCode,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        return responseData.convertedCode;
    } catch (error) {
        console.error('Error converting code:', error.message);
        throw error;
    }
}

