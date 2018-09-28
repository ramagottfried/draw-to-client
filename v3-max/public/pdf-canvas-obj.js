
// file muse be specified in the HTML file like:
// <script src="pdf-loader.js" id="pdf-loader" PDFfile="./piano-flint.pdf"></script>

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];
// The workerSrc property
pdfjsLib.GlobalWorkerOptions.workerSrc = 'scripts/pdfjs-dist/build/pdf.worker.js';

function PDFdoc(id)
{
  this.pdfcanvas = document.createElement("canvas");
  this.pdfcanvas.id = id;
  this.pdfcanvas.class = "pdfcanvas";

  document.getElementById("main").appendChild(this.pdfcanvas);
  this.pdfcontext = pdfcanvas.getContext('2d');

  this.pdfDoc = null;
  this.scale = 2;
  this.pageNum = 1;
  this.pageRendering = false;
  this.pageNumPending = null;

  /**
   * Asynchronously downloads PDF.
   */
  this.setPDFref = function( filename ) {
    console.log( "loading " + filename );
    pdfjsLib.getDocument(filename).then( function(pdfDoc_) {
      this.pdfDoc = pdfDoc_;
      // document.getElementById('page_count').textContent = pdfDoc.numPages;

      // Initial/first page rendering
      this.renderPage(this.pageNum);
    });
  }

  /**
   * Get page info from document, resize canvas accordingly, and render page.
   * @param num Page number.
   */
  this.renderPage = function (num) {
      this.pageRendering = true;
    // Using promise to fetch the page
      this.getPage(num).then( function(_page) {

      var viewport = _page.getViewport(this.scale);

      this.pdfcanvas.height = viewport.height;
      this.pdfcanvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: pdfcontext,
        viewport: viewport
      };

      var renderTask = _page.render(renderContext);

      // Wait for rendering to finish
      renderTask.promise.then( function() {
        this.pageRendering = false;
        if (this.pageNumPending !== null) {
          // New page rendering is pending
          this.renderPage(this.pageNumPending);
          this.pageNumPending = null;
        }
      });
    });
  }

  /**
   * If another page rendering in progress, waits until the rendering is
   * finised. Otherwise, executes rendering immediately.
   */
  this.queueRenderPage = function(num) {
    if (this.pageRendering) {
      this.pageNumPending = num;
    } else {
      this.renderPage(num);
    }
  }

  /**
   * Displays previous page.
   */
  this.prevPage = function() {
    if (this.pageNum <= 1 ) {
      return;
    }
    this.pageNum--;
    this.queueRenderPage(this.pageNum);
  }
  // document.getElementById('prev').addEventListener('click', onPrevPage);

  /**
   * Displays next page.
   */
  this.nextPage = function() {
    if (this.pageNum >= this.pdfDoc.numPages) {
      return;
    }
    this.pageNum++;
    this.queueRenderPage(this.pageNum);
  }
  // document.getElementById('next').addEventListener('click', onNextPage);


}
