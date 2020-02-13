import unittest
import unittest.mock as mock

def add(a, b):
    return a+b

def multiply(a,b):
    pass

def add_plus_multiply(a,b):
    return add(a,b) + multiply(a,b)

class DummyTest(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(3, 4), 7)

    @mock.patch('test_sample.multiply')
    def test_add_multiply(self,mock_multiply):
        a, b = 3, 5
        mock_multiply.return_value = 15
        self.assertEquals(8+15, add_plus_multiply(a,b))

if __name__ == '__main__':
    unittest.main()