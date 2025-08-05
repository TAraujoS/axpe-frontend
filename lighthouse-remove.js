// Script para restaurar o estado normal após os testes
// Cole este código no console do navegador (F12)

console.log('🔧 [LCP DEBUG] Restaurando estado normal...');

// Remover flag de simulação do localStorage
localStorage.removeItem('lighthouse-simulation');

console.log('✅ [LCP DEBUG] Simulação removida do localStorage');
console.log('🔄 [LCP DEBUG] Recarregando página...');

// Recarregar a página
setTimeout(() => {
  window.location.reload();
}, 1000); 