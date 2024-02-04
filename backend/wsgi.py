from services.parser import get_imported_classes
from services.github_wrapper import get_package_classes, github

code = """

from .webscapy import Webscapyasdkfljasdg
from .webscapy import Webscapyasdkfljasdgasdf
from .webscapy import Webscapyasdkfljasdgasdasdff
from .webscapy import Webscapyasdkfljasdgasd


asdlfkasdg
asdfjasdg


"""


classes = get_package_classes("dusklight00/webscapy", packages=["webscapy"])
print(classes)
