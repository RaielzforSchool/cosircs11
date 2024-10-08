from stornetta import LinearEquation

equation = LinearEquation()
count = 0
while True:
  
  if count == 0:
    rand_equation = equation.create_random_equation()
  equation.update_equation()
  possible_numbers_to_input = equation.poss_num_list()
  possible_opearators_to_input = equation.poss_opers_list()
  print(f"Equation: {equation.get_equation()}\n--------")
  

  operation = input(f"Choose: {possible_opearators_to_input} ")
  amount = input(f"By what number: {possible_numbers_to_input} ")
  print("\n---------")
  if operation == "+":
    equation.perform_addition(amount)
  elif operation == "-":
    equation.perform_subtraction(amount)
  elif operation == '/':
    equation.perform_division(amount)
  else:
    print("invalid")
  equation.update_equation()
  if equation.is_final_solution():
    print(f"Solved! Answer is: x = {int(equation.answer)}")
    break
  print(f"Previous: {equation.previous_equation}\n---------")
  
  count += 1


