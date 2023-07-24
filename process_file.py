import pandas as pd
import sys
import json

def process_file(file_path, file_type):
    # Dictionary to store different pandas read functions based on file type
    read_functions = {
        'csv': pd.read_csv,
        'json': pd.read_json,
        'xml': pd.read_xml,
        'excel': pd.read_excel,
        # Add more if needed, e.g., 'edi': pd.read_edi
    }

    try:
        # Check if the file type is supported
        if file_type not in read_functions:
            raise ValueError(f"Unsupported file type: {file_type}")

        # Read the file using the appropriate pandas read function
        df = read_functions[file_type](file_path)

        # Convert the DataFrame to a JSON string
        output_data = df.to_json(orient='records')

        return output_data
    except Exception as e:
        return json.dumps({'error': str(e)})


if __name__ == "__main__":
    # Get the file path and file type from command-line arguments
    file_path = sys.argv[1]
    file_type = sys.argv[2]

    # Process the file and get the JSON output
    result_json = process_file(file_path, file_type)

    # Print the JSON output to be captured by the calling script
    print(result_json)