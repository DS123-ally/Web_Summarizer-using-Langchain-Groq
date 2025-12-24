import pkgutil
import langchain
print('langchain package location:', langchain.__file__)
print('Submodules:')
for m in pkgutil.iter_modules(langchain.__path__):
    print('-', m.name)
