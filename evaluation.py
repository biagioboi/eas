import matplotlib.pyplot as plt
import numpy as np
import json

import pandas as pd
from matplotlib import colors
from matplotlib.ticker import PercentFormatter
import seaborn as sns

f = open("results_create_attest.json")

data = json.load(f)
#for y in data:
#    print(y)
#    data[y] = [float(x) for x in data[y]]
plt.figure(dpi=1200)
data = [float(x) for x in data]
#r = plt.boxplot([data['1'], data['10'], data['100'], data['200'], data['500'], data['1000']])
r = plt.violinplot(data, showmeans=True, showmedians=True)
#plt.suptitle('Time elapsed for attestation registration',
             #fontweight="bold")
plt.ylabel("Time (ms)")
plt.savefig('time_attest_reg.png')
plt.show()
