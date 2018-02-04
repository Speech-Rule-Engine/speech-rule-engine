## Elements to sort out

* bproc12: large circle times

* bproc12: Don't speak separator before hyphen in -mod

* Recompute sets with set extension


Problems: 

Works in lab but otherwise error occurs in the toMathML method
\begin{equation*}
 \operatorname {ord}_\mathbf{m}(f_1)=\langle \mathbf{m},\mathbf{u_1}\rangle =\langle \mathbf{m},\mathbf{v_1}\rangle \text{ and }\operatorname {ord}_\mathbf{m}(f_2)=\min (\langle \mathbf{m},\mathbf{u_2}\rangle ,\langle \mathbf{m},\mathbf{v_2}\rangle ). 
\end{equation*}


\begin{align*}
 \lambda & =\frac {(a+1)m_1+(b+1)m_2+(c+1)m_3+k}{\operatorname {ord}_\mathbf{m}(f_1)+k}+d \\
 & =\frac {(a+1)m_1+(b+1)m_2+(c+1)m_3-\operatorname {ord}_\mathbf{m}(f_1)+\operatorname {ord}_\mathbf{m}(f_1)+k}{\operatorname {ord}_\mathbf{m}(f_1)+k}+d \\
 & =\frac {(a+1)m_1+(b+1)m_2+(c+1)m_3-\operatorname {ord}_\mathbf{m}(f_1)}{\operatorname {ord}_\mathbf{m}(f_1)+k}+d+1. 

\end{align*}


\begin{align*}
 \lambda & = a\\
 & = b\\
 & = c 
\end{align*}

## Multiline equation roles

Type is  always multiline

### New Roles
    
  * equality system of the form:
      a & = b & = c\\
      a & = b & = c\\
  or
        a & = b \\
        a & = b \\
  or
        a & = & b & = & c\\
        a & = & b & = & c\\
  or
        a & = & b \\
        a & = & b \\

  * relation system of the above form, but not necessarily with equalities.
  


### Not yet considered:

\begin{align} 
a_{11}& =b_{11}& a_{12}& =b_{12}\\ 
a_{21}& =b_{21}& a_{22}& =b_{22}+c_{22} 
\end{align}


\begin{equation}
\begin{split} 
a& =b+c-d\\ 
& \quad +e-f\\ 
& =g+h\\ 
& =i 
\end{split} 
\end{equation} 

This yields an mspace before the + in the second line!
