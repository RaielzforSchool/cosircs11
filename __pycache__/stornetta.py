import random


class LinearEquation():
  def __init__(self,cof=None, number=None, answer=None, operation=None, equation=None):
    self.coefficient = cof
    self.number = number
    self.answer = answer
    self.operation = operation
    self.equation = equation
    self.previous_equation = None
  

  def update_equation(self):
    try: 
      if self.i is not None:
        if self.number == 0:
          self.equation =  f"{int(self.i)}x  = {int(self.answer)}" 
        else:
          self.equation =  f"{int(self.i)}x {self.operation} {int(self.number)} = {int(self.answer)}" if self.operation=="+" else f"{int(self.i)}x {int(self.number)} = {int(self.answer)}"
      else:
        self.equation =  f"x {self.operation} {int(self.number)} = {int(self.answer)}" if self.operation=="+" else f"x {int(self.number)} = {int(self.answer)}"
    except: print("Not all requirements met to create equation, check to see if the following are included: i, number, answer, operation.")
  
  def get_equation(self):
    return self.equation

  def answer_is_integer(self):
    if self.operation == "+":
      if ((self.answer - self.number) / self.i).is_integer():
        return True
    elif self.operation == "-":
      if ((self.answer + self.number)/self.i).is_integer():
        return True
    else:
      return False

  def create_random_equation(self):
    while True:
      poss_nums = [1,2,3,4,5,6,7,8,9]
      poss_ops = ["+","-"]
      i = random.choice(poss_nums)
      number = random.choice(poss_nums)
      answer = random.choice(poss_nums)
      operation = random.choice(poss_ops)
      if i != 1 and number != answer:
        if operation == "+":
          if ((answer - number) / i).is_integer():
            self.i = i
            self.number = int(number)
            self.answer = answer
            self.operation = '+'
            
            break
        elif operation == "-":
          if (float((answer + number)/i)).is_integer():
            self.i = i
            self.number = int(number) * -1
            self.answer = answer
            self.operation = '-'
            
            break
      
   
    
  
  def poss_num_list(self):
    
    self.number = int(self.number) 
    self.answer = int(self.answer)  

   
    number = abs(self.number) if self.number < 0 else self.number

    if self.i is not None:
      list_of_possible_nums = [self.i, number, self.answer]
    else:
      list_of_possible_nums = [number, self.answer]
    return list_of_possible_nums

  def poss_opers_list(self):
    self.number = int(self.number)
    self.answer = int(self.answer)
    if self.number > 0:
      list_of_possible_ops = ['-', "/"]
    else :
      list_of_possible_ops = ['+', '/']
    return list_of_possible_ops

  def perform_addition(self, amount):
    self.number = int(self.number)
    self.answer = int(self.answer)
    amount = int(amount)
    
    self.previous_equation = self.equation
    self.number, self.answer = self.number+amount, self.answer+amount
    if self.number == 0:
      self.operation = '+'
    
    

  def perform_subtraction(self, amount):
    self.number = int(self.number)
    self.answer = int(self.answer)
    amount = int(amount)
    
    self.previous_equation = self.equation
    self.number -= amount
    self.answer -= amount
    
    
  
  def perform_division(self,amount):
    if int(amount) != int(self.i):
      print("Can only divide by i here.")
      return
    amount = int(amount)
    self.previous_equation = self.equation
    if amount == 0:
      print("Cannot Divide by Zero.")
    if float(self.answer/amount).is_integer():
      self.answer /= amount
      self.i = None
    else:
      print("Divison Would Result in Decimal Number.")
    
    

  def is_final_solution(self):
    #print("made it to is final solution method")
    #print(self.equation, self.answer)
    if self.equation == f"x = {int(self.answer)}" or self.equation == f"Nonex + 0 = {int(self.answer)}" or self.equation == f"x + 0 = {int(self.answer)}":
      return True
    else:
      return False




  
  
      





