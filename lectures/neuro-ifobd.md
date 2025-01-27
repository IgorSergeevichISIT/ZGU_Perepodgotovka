## Лабораторная работа №1: "Создание простой нейронной сети для классификации вредоносного кода"

**Цель работы:** Разработать базовую нейронную сеть для определения потенциально опасного программного кода.

**Задачи:**
- Познакомиться с основами создания нейронных сетей на Python
- Научиться работать с библиотекой NumPy
- Реализовать простую классификацию кода

**Практическая часть:**

1. Создание простой нейронной сети:
```python
import numpy as np

class SimpleNeuralNetwork:
    def __init__(self):
        np.random.seed(1)
        self.weights = 2 * np.random.random((3, 1)) - 1
        
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))
    
    def sigmoid_derivative(self, x):
        return x * (1 - x)
    
    def train(self, inputs, outputs, iterations):
        for _ in range(iterations):
            output = self.think(inputs)
            error = outputs - output
            adjustment = np.dot(inputs.T, error * self.sigmoid_derivative(output))
            self.weights += adjustment
    
    def think(self, inputs):
        return self.sigmoid(np.dot(inputs, self.weights))
```

2. Подготовка тренировочных данных:
```python
training_inputs = np.array([[0,0,1],  # безопасный код
                           [1,1,1],    # вредоносный код
                           [1,0,1],    # вредоносный код
                           [0,1,1]])   # безопасный код

training_outputs = np.array([[0,1,1,0]]).T
```

## Лабораторная работа №2: "Разработка системы обнаружения сетевых атак"

**Цель работы:** Создать простую систему обнаружения аномального сетевого трафика с использованием машинного обучения.

**Задачи:**
- Изучить основы работы с сетевым трафиком в Python
- Реализовать базовую классификацию сетевых пакетов
- Научиться определять потенциально опасный трафик

**Практическая часть:**

1. Создание анализатора трафика:
```python
from scapy.all import *
import numpy as np

class TrafficAnalyzer:
    def __init__(self):
        self.suspicious_patterns = ['GET /admin', 'SELECT *', 'DROP TABLE']
        
    def analyze_packet(self, packet):
        if packet.haslayer(TCP):
            payload = str(packet[TCP].payload)
            return self.check_suspicious(payload)
    
    def check_suspicious(self, data):
        score = 0
        for pattern in self.suspicious_patterns:
            if pattern in data:
                score += 1
        return score > 0
```

2. Функция мониторинга:
```python
def monitor_traffic(interface="eth0"):
    analyzer = TrafficAnalyzer()
    
    def packet_callback(packet):
        if analyzer.analyze_packet(packet):
            print("Обнаружен подозрительный трафик!")
            
    sniff(iface=interface, prn=packet_callback, store=0)
```

**Задания для самостоятельной работы:**
- Добавить новые паттерны для обнаружения атак
- Реализовать сохранение логов подозрительной активности
- Улучшить систему оценки угроз
