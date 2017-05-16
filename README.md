Tiny Handwritten OCR (using IBM Watson)
=======================================

This is a tiny example of how to recognize handwritten digits using IBM Watson Visual Recognition, this app runs solely on the client's browser, and sends and receives data to Watson through ajax calls.

The training set is at the folder digits/ , with the code to train Watson to recognize the digits ('training.sh').

The code for the app is in the src/ , you could open the 'index.html' with the browser or serve it with python or any static file server:

```python
#python 3
python -m http.server 8080
```

Or

```python
#python 2
python -m SimpleHTTPServer 8080
```

Then access it with 'localhost:8080' in a web browser.

