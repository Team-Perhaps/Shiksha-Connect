from pathlib import Path
from gpt4all import GPT4All

model = GPT4All(model_name='orca-mini-3b.ggmlv3.q4_0.bin',
                model_path=(Path.home() / '.cache' / 'gpt4all'),
                allow_download=False)
response = model.generate('my favorite 3 fruits are:', temp=0)
print(response)