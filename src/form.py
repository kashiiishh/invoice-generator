# # import sys
# # import requests

# # if len(sys.argv) != 8:
# #     print("Invalid arguments")
# #     sys.exit(1)

# # client_name, total, sgst, cgst, discount, total_payable, payment_source = sys.argv[1:]

# # form_url = "https://docs.google.com/forms/d/e/1FAIpQLSda347zdFcfSrnduM-LzNiUkKCSopHevscDUZDYS8FkB3fyMw/formResponse"
# # form_data = {
# #     "entry.11395408": client_name,
# #     "entry.1649696198": total,
# #     "entry.868797987": sgst,
# #     "entry.253471962": cgst,
# #     "entry.473550820": discount,
# #     "entry.640404071": total_payable,
# #     "entry.1769481674": payment_source,
# # }

# # response = requests.post(form_url, data=form_data)
# # if response.status_code == 200:
# #     print("Data submitted successfully")
# # else:
# #     print(f"Failed to submit data: {response.status_code}")


# import sys
# import requests

# if len(sys.argv) != 9:
#     print("Invalid arguments")
#     sys.exit(1)

# client_name, invoice_number, invoice_date, total, sgst, cgst, discount, total_payable, payment_source = sys.argv[1:]

# form_url = "https://docs.google.com/forms/d/e/1FAIpQLSda347zdFcfSrnduM-LzNiUkKCSopHevscDUZDYS8FkB3fyMw/formResponse"

# form_data = {
#     "entry.11395408": client_name,        # Customer Name
#     "entry.1649696198": invoice_number,   # Invoice Number
#     "entry.868797987": invoice_date,      # Invoice Date
#     "entry.253471962": total,             # Total
#     "entry.473550820": sgst,              # SGST
#     "entry.640404071": cgst,              # CGST
#     "entry.1769481674": discount,         # Discount
#     "entry.699173398": total_payable,    # Total Payable
#     "entry.584164247": payment_source,    # Payment Source
# }


# response = requests.post(form_url, data=form_data)

# if response.status_code == 200:
#     print("Data submitted successfully")
# else:
#     print(f"Failed to submit data: {response.status_code}")


import sys
import requests

# Ensure correct number of arguments
if len(sys.argv) != 10:
    print("Invalid arguments")
    sys.exit(1)

# Unpack arguments
client_name, invoice_number, invoice_date, total, sgst, cgst, discount, total_payable, payment_source = sys.argv[1:]

# The Google Form URL for submission
form_url = "https://docs.google.com/forms/d/e/1FAIpQLSda347zdFcfSrnduM-LzNiUkKCSopHevscDUZDYS8FkB3fyMw/formResponse"

# Prepare the data to send to the Google Form
form_data = {
    "entry.11395408": client_name,         # Customer Name
    "entry.1649696198": invoice_number,    # Invoice Number
    "entry.868797987": invoice_date,       # Invoice Date
    "entry.253471962": total,              # Total
    "entry.473550820": sgst,               # SGST
    "entry.640404071": cgst,               # CGST
    "entry.1769481674": discount,          # Discount
    "entry.699173398": total_payable,     # Total Payable
    "entry.584164247": payment_source,     # Payment Source
}

# Send the POST request to Google Form
response = requests.post(form_url, data=form_data)

# Check the response and output success or failure
if response.status_code == 200:
    print("Data submitted successfully")
else:
    print(f"Failed to submit data: {response.status_code}")
