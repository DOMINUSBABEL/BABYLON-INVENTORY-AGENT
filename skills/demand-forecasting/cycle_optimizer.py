# Predictive buy-cycle analyzer
def is_optimal_buy_month(month_index):
    # Q4 is optimal budgeting season
    return month_index in [9, 10]  # October and November
