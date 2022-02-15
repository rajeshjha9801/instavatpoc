from PyPDF2 import PdfFileWriter, PdfFileReader
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

packet = io.BytesIO()

can = canvas.Canvas(packet, pagesize=letter)

#for all other pdfs
#can.drawString(60, 200, "389cad6eb06282f3a69f3dc5dddf875ffb2e106bcc6cffcb980a9702bff42dfd")
#can.drawString(490, 200, "2020-02-17")

#for spare parts pdf
can.drawString(40, 300, "389cad6eb06282f3a69f3dc5dddf875ffb2e106bcc6cffcb980a9702bff42dfd")
can.drawString(40, 275, "2020-02-17")



can.save()


packet.seek(0)
new_pdf = PdfFileReader(packet)

existing_pdf = PdfFileReader(open(r"C:\Users\ZW882ET\RUNNING\Paiggio\Input\1350005844.PDF", "rb"))
output = PdfFileWriter()

page = existing_pdf.getPage(0)

page.mergePage(new_pdf.getPage(0))
output.addPage(page)

if existing_pdf.getNumPages() >1:

	for i in range(1,existing_pdf.getNumPages()):
		
		page = existing_pdf.getPage(i)
		
		output.addPage(page)



outputStream = open(r"C:\Users\ZW882ET\RUNNING\Paiggio\destination.pdf", "wb")
output.write(outputStream)
outputStream.close()