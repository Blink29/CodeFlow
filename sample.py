class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def study(self, subject):
      """The provided Python code defines a method `study` within a class. This method takes two parameters: `self` and `subject`. The `self` parameter is a reference to the instance of the class and allows the method to access and modify the instance's attributes. The `subject` parameter is a string that represents the subject the instance is studying. The method prints a formatted string that includes the instance's name and the subject it's studying. For instance, if the instance's name is 'Alice' and the subject is 'math', the method will print 'Alice is studying math.' [Source 2](https://www.geeksforgeeks.org/self-in-python-class/), [Source 8](https://www.digitalocean.com/community/tutorials/how-to-define-functions-in-python-3)"""

      """The code defines a function named `study` that takes two parameters: `self` and `subject`. The function prints a message that says the name of the object (`self.name`) and the subject it is studying. For example, if `self.name` is 'Alice' and `subject` is 'math', the function will print 'Alice is studying math.'"""

      print(f"{self.name} is studying {subject}.")

class Teacher:
    def __init__(self, name, subject):
      self.name = name
      self.subject = subject

    def teach(self):
      """The provided Python code defines a method `teach` within a class. This method prints a statement that includes the name of the object instance (`self.name`) and the subject they are teaching (`self.subject`). The `self` keyword represents the instance of the object itself, and it's used to access the object's attributes or methods. In this case, it's used to access the `name` and `subject` attributes of the object. The method essentially states who is teaching what. [Source 0](https://stackoverflow.com/questions/625083/what-do-init-and-self-do-in-python)"""

      """The provided Python code defines a method `teach` within a class. This method prints a statement that includes the name of the object instance (`self.name`) and the subject they are teaching (`self.subject`). The `self` keyword represents the instance of the object itself, and it's used to access the object's attributes or methods. In this case, it's used to access the `name` and `subject` attributes of the object [Source 0](https://stackoverflow.com/questions/625083/what-do-init-and-self-do-in-python)."""

      print(f"{self.name} is teaching {self.subject}.")

class School:
    def __init__(self, name):
      self.name = name
      self.students = []
      self.teachers = []

    def enroll_student(self, student):
      """The provided Python code defines a method `enroll_student(self, student)` that adds a student object to a list of students in a self object, and prints a message indicating that the student has enrolled in the self's name. The `self` keyword refers to the instance of the class where the method is being called. The `student` parameter is an object that represents a student. The `self.students.append(student)` line adds the student object to the list of students in the self object. The `print` statement then outputs a message that includes the student's name and the name of the self object, indicating that the student has enrolled in the self's name.

Here's a breakdown of the code:

- `def enroll_student(self, student):` This line defines a method named `enroll_student` that takes two parameters: `self` and `student`. The `self` parameter is a reference to the current instance of the class, and `student` is an object representing a student.

- `self.students.append(student)` This line adds the `student` object to the `students` list in the `self` object.

- `print(f'{student.name} is now a student at {self.name}.')` This line prints a message indicating that the student has enrolled in the `self` object's name. The `f` before the string indicates that it's a formatted string, which allows you to embed expressions inside string literals, using curly braces `{}`. The expressions will be replaced with their values when the string is printed.

This code is likely part of a larger class definition for a school or educational institution, where `self` could represent a class or a course. The `students` list would contain all the students enrolled in that class or course. When a student is enrolled, their details are added to the list, and a message is printed to confirm the enrollment."""

      """The code defines a function that adds a student object to a list of students in a self object, and prints a message that the student has enrolled in the self's name."""

      self.students.append(student)
      print(f"{student.name} is now a student at {self.name}.")

    def hire_teacher(self, teacher):
      """The code is a function that hires a teacher for a school. It adds the teacher to the school's list of teachers and prints a welcome message with their names. (24 words)"""

      """The code defines a function that adds a teacher object to a list of teachers in a self object, and prints a message that the teacher is hired by the self's name."""

      self.teachers.append(teacher)
      print(f"{teacher.name} is now a teacher at {self.name}.")

# Create instances of the classes
student1 = Student("Alice", 16)
teacher1 = Teacher("Mr. Smith", "Math")
school1 = School("ABC School")

# Use the methods
student1.study("Math")
teacher1.teach()
school1.enroll_student(student1)
school1.hire_teacher(teacher1)
